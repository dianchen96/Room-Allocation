from django.http import HttpResponse, HttpResponseNotFound
from django.views.generic import ListView, DetailView
from django.shortcuts import redirect, render, get_object_or_404
from django.contrib import messages
from .models import Case, Room, Group, Allocation
from .forms import CaseForm, RoomForm, GroupForm, ReadOnlyCaseForm, SessionForm
from datetime import datetime

# Class for index view, an overview of all existing cases
class IndexView(ListView):
	template_name = 'room/index.html'
	model = Case

	def get_queryset(self):
		'''
		Return the list of all Case objects ordered by create time
		'''
		return Case.objects.order_by('-created_date')

	def get_context_data(self, **kwargs):
		'''
		Return the context of index view
		'''
		context = super(IndexView, self).get_context_data(**kwargs)
		context['form'] = CaseForm()
		return context


class CaseView(DetailView):
	'''
  The genertic class for case view, a detailed overview of a case. 
  This view also renders err message based on the error code in the GET
  query string, if redirected from '/start_alloc'. See below for detailed 
  explanation of error code
	'''
	template_name = 'room/case_detail.html'
	model = Case

	err_msg = {
		1: "The identity you selected is invalid. Please try again.",
		2: "The idendity you selected has already logged in. Please try again.",
	}

	def get_context_data(self, **kwargs):
		context = super(CaseView, self).get_context_data(**kwargs)
		context['rooms'] = Room.objects.filter(case=self.object)
		context['groups'] = Group.objects.filter(case=self.object)
		context['case_form'] = ReadOnlyCaseForm(instance=self.object)
		context['rooms'] = Room.objects.filter(case=self.object)
		context['renters'] = Group.objects.filter(case=self.object)
		context['room_form'] = RoomForm(initial={'case':self.object})
		context['group_form'] = GroupForm(initial={'case':self.object})
		context['session_form'] = SessionForm(self.object)
		# If there is err_msg in GET query, include it in context
		if self.request.GET.get("err"):
			err_code = int(self.request.GET.get("err"))
			context['err_msg'] = CaseView.err_msg[err_code]
		return context



class AllocView(DetailView):
	template_name = 'room/alloc_detail.html'
	model = Allocation

	def get_context_data(self, **kwargs):
		context = super(AllocView, self).get_context_data(**kwargs)
		context['groups'] = Group.objects.filter(case=self.object.case)
		context['rooms'] = Room.objects.filter(case=self.object.case)
		context['case_form'] = ReadOnlyCaseForm(instance=self.object.case)
		return context


def start_alloc(request, pk):
	if request.method == 'POST':
		case = get_object_or_404(Case, pk=pk)
		form = SessionForm(case, request.POST)
		if form.is_valid():
			# Log in the group
			group_name = form.cleaned_data['group']
			group = get_object_or_404(Group, case=case, name=group_name)
			group.login(request.user)
			alloc = get_object_or_404(Allocation, pk=case)
			if alloc.is_ready():
				# Setup is_ready message
				messages.add_message(request, messages.INFO, "ready", group.case)
			return redirect("room:alloc", pk=group.case.name)
		else:
			return redirect(request.META.get('HTTP_REFERER') + "?err=1")
	else:
		return HttpResponseNotFound('<h3>Page not found</h3>')




# Method for creating a case
def create_case(request):
	if request.method == 'POST':
		form = CaseForm(request.POST, request.FILES)
		if form.is_valid():
			form.save()
			# Create an associated alloction object
			alloc = Allocation(form.cleaned_data['name'])
			alloc.save()
			return redirect('room:index')
		else:
			return render(request, 'room/index.html', {'form':form})

	else:
		return HttpResponseNotFound('<h3>Page not found</h3>')

# Method for creating a room
def create_room(request):
	if request.method == 'POST':
		form = RoomForm(request.POST)
		if form.is_valid():
			form.save()
			return redirect(request.META.get('HTTP_REFERER'))
		else:
			return redirect(request.META.get('HTTP_REFERER'))

	else:
		return HttpResponseNotFound('<h3>Page not found</h3>')

# Method for creating a group
def create_group(request):
	if request.method == 'POST':
		form = GroupForm(request.POST)
		if form.is_valid():
			form.save()
			return redirect(request.META.get('HTTP_REFERER'))
		else:
			return redirect(request.META.get('HTTP_REFERER'))

	else:
		return HttpResponseNotFound('<h3>Page not found</h3>')
