from django.http import HttpResponse, HttpResponseNotFound
from django.views.generic import ListView, DetailView
from django.shortcuts import redirect, render
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


# class for case view, a detailed overview of a case
class CaseView(DetailView):
	template_name = 'room/case_detail.html'
	model = Case

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
		return context



class AllocView(DetailView):
	template_name = 'room/alloc_detail.html'
	model = Allocation

	def get_context_data(self, **kwargs):
		context = super(AllocView, self).get_context_data(**kwargs)
		context['groups'] = Group.objects.filter(case=self.object)
		context['rooms'] = Room.objects.filter(case=self.object)
		context['case_form'] = ReadOnlyCaseForm(instance=self.object)
		return context

	def post(self, request, *args, **kwargs):
		form = SessionForm(request.POST)
		if form.is_valid():
			# Log in the group
			group_name = form.cleaned_data['group']
			try:
				group = Group.objects.get(case=self.object.case, name=group_name)
			except ObjectDoesNotExist:
				return HttpResponseNotFound(
					"<h3>No corresbonding group exists. Please contact administrator</h3>")
			group.login(request.user)
			if self.object.is_ready():
				# TODO: Inform all group members
				

		else:



# Method for creating a case
def create_case(request):
	if request.method == 'POST':
		form = CaseForm(request.POST, request.FILES)
		if form.is_valid():
			form.save()
			# Create associated alloction object
			alloc = Allocation(form.instance)
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