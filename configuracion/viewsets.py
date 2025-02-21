from rest_framework.viewsets import ModelViewSet
from rest_framework.parsers import JSONParser
from configuracion.models import TipoCita, Medico
from configuracion.serializers import TipoCitaSerializer, MedicoSerializer


class TipoCitaViewSet(ModelViewSet):
    serializer_class = TipoCitaSerializer
    http_method_names = ['get', 'options', 'head']
    parser_classes = [JSONParser]
    queryset = TipoCita.objects.all()


class MedicoViewSet(ModelViewSet):
    serializer_class = MedicoSerializer
    http_method_names = ['get', 'options', 'head']
    parser_classes = [JSONParser]
    queryset = Medico.objects.all()