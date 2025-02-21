from django.db import models

class TipoCita(models.Model):

    """
    Modelo para crear los tipos de citas como se puede ver en el documento, esto se crea como una aplicación aparte
    por si en algun momento se tenga que escalar y este como una sola aplicación.

    por decir los primeros tipos de "citas" serian los que vienen en el pdf

    (Consulta, Servicio, Tratamiento, etc.)

    -   El nombre_cita sirve para ponerle un nombre al tipo de la cita por decir -> Consulta
    -   El campo activo sirve para saber si va a estar activo o no, en el momento que se quiera registrar una cita
    """

    nombre_cita = models.CharField(verbose_name="Nombre de la cita", max_length=100)
    activo = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Tipo De Cita"
        verbose_name_plural = "Tipos De Citas"

    def __str__(self):
        return self.nombre_cita


class Medico(models.Model):

    """
    Modelo para poder crear el nombre del medico con el que asistira, esto para que en el frontend al usuario
    pueda aparecerle una lista desplegable y buscar entre los medicos o con un buscador el medico que esta buscando

    - El nombre_medico es para poder poner el nombre del medico y quede registrado

    """

    nombre_medico = models.CharField(verbose_name="Nombre completo del medico", max_length=250)


    class Meta:
        verbose_name = "Medico"
        verbose_name_plural = "Medicos"

    def __str__(self):
        return self.nombre_medico