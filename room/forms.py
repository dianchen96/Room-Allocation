from django import forms
from django.forms import Form, ModelForm
from django.forms.widgets import Widget, HiddenInput
from django.template import Template
from django.utils.safestring import mark_safe

from .models import Case, Room, Group, Allocation

class CaseForm(ModelForm):
	class Meta:
		model = Case
		fields = ['name', 'img', 'rent', 'created_date']

class ReadOnlyCaseForm(ModelForm):
	def __init__(self, *args, **kwargs):
		super(ReadOnlyCaseForm, self).__init__(*args, **kwargs)
		instance = getattr(self, 'instance', None)
		if instance and instance.pk:
			# Disable all field
			self.fields['created_date'].widget.attrs['readonly'] = True
			self.fields['img'].widget = HiddenInput()
			self.fields['name'].widget.attrs['readonly'] = True
			self.fields['rent'].widget.attrs['readonly'] = True

	class Meta:
		model = Case
		fields = ['name', 'img', 'rent', 'created_date']

class RoomForm(ModelForm):
	def __init__(self, *args, **kwargs):
		super(RoomForm, self).__init__(*args, **kwargs)
		self.fields['case'].widget = HiddenInput()

	class Meta:
		model = Room
		fields = ['case', 'name']

class GroupForm(ModelForm):
	def __init__(self, *args, **kwargs):
		super(GroupForm, self).__init__(*args, **kwargs)
		self.fields['case'].widget = HiddenInput()

	class Meta:
		model = Group
		fields = ['case', 'name', 'num_of_renters']

class SessionForm(Form):
	group = forms.ModelChoiceField(queryset=None)

	def __init__(self, case, *args, **kwargs):
		super(SessionForm, self).__init__(*args, **kwargs)
		self.fields['group'].queryset = Group.objects.filter(case=case)

	def save(self, commit=True):
		super(SessionForm, self).save(commit=False)


		
