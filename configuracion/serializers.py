from rest_framework import serializers
from configuracion.models import TipoCita, Medico


class TipoCitaSerializer(serializers.ModelSerializer):

    class Meta:
        model = TipoCita
        fields = '__all__'

class MedicoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Medico
        fields = '__all__'