from django.contrib import admin
from citas.models import Cita
from django.contrib import auth


@admin.register(Cita)
class ModelNameAdmin(admin.ModelAdmin):
    list_display = ('paciente', 'medico' , 'numero_cita')

    def get_readonly_fields(self, request, obj=None):
        if request.user.is_superuser:
            return ()
        if request.user.is_staff:
            return ('paciente', 'medico', 'groups', 'numero_cita')
        return (auth.admin.UserAdmin.fields)

