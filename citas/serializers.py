from citas.models import Cita
from rest_framework import serializers

class CitaSerializer(serializers.ModelSerializer):
    """

        Serializador para la cita, esto devuelve el nombre del tipo de la cita y el nombre del medico ya que sin esto
        nos traeria el ID y esto no nos sirve en el frontend

        """
    tipo_cita_nombre = serializers.CharField(source="tipo_cita.nombre_cita", read_only=True)
    medico_nombre = serializers.CharField(source="medico.nombre_medico", read_only=True)

    class Meta:
        model = Cita
        fields = ['id', 'fecha_hora', 'paciente', 'numero_cita', 'tipo_cita', 'medico', 'tipo_cita_nombre', 'medico_nombre']
