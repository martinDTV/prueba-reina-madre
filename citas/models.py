from django.db import models
from configuracion.models import TipoCita, Medico
import uuid


class Cita(models.Model):
    """

    Modelo para poder crear las citas

    - Fecha_hora -> este campo va a guardar la fecha y hora de la cita
    - paciente -> este campo va a guardar el nombre del paciente que va a tener la cita
    - tipo_cita -> este campo esta enlazado al modelo TipoCita para poder escoger de esos las citas que estan registradas
    - medico -> este campo esta enlazado al modelo Medico para poder escoger los medicos que estan registrados
    - numero_cita -> este campo va a guardar el numero de la cita para poder buscarlo despues desde el frontend
    """
    fecha_hora = models.DateTimeField(verbose_name="Fecha y hora de la cita")
    paciente = models.CharField(verbose_name="Nombre completo", max_length=250)
    tipo_cita = models.ForeignKey(TipoCita, on_delete=models.PROTECT, verbose_name="Tipo de cita")
    medico = models.ForeignKey(Medico, on_delete=models.PROTECT, verbose_name="Médico")
    numero_cita =models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    class Meta:
        verbose_name = "Cita"
        verbose_name_plural = "Citas"
        ordering = ["-fecha_hora"]

    def __str__(self):
        return f"Cita {self.numero_cita} - {self.paciente}"
