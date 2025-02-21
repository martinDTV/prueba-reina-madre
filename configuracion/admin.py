from django.contrib import admin
from configuracion.models import TipoCita, Medico
from django.contrib import auth


@admin.register(TipoCita)
class ModelNameAdmin(admin.ModelAdmin):
    list_display = ('nombre_cita', 'activo')

    def get_readonly_fields(self, request, obj=None):
        if request.user.is_superuser:
            return ()
        if request.user.is_staff:
            return ('nombre_cita', 'groups', 'activo')
        return (auth.admin.UserAdmin.fields)


@admin.register(Medico)
class ModelNameAdmin(admin.ModelAdmin):
    list_display = ('nombre_medico',)

    def get_readonly_fields(self, request, obj=None):
        if request.user.is_superuser:
            return ()
        if request.user.is_staff:
            return ('nombre_medico', 'groups')
        return (auth.admin.UserAdmin.fields)