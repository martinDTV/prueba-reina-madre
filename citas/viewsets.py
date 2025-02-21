from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from citas.serializers import CitaSerializer
from configuracion.models import Medico, TipoCita
from rest_framework.parsers import JSONParser
from citas.models import Cita
from rest_framework.permissions import AllowAny
from rest_framework import status



class CitaViewSet(ModelViewSet):
    model = Cita
    serializer_class = CitaSerializer
    parser_classes = [JSONParser]
    permission_classes = [AllowAny]
    http_method_names = ['get', 'post', 'patch', 'delete', 'head', 'options']

    def get_queryset(self):
        return Cita.objects.all()

    def create(self, request, *args, **kwargs):
        nombre_medico = request.data.get('medico')
        nombre_tipo_cita = request.data.get('tipo_cita')

        if not nombre_medico or not nombre_tipo_cita:
            return Response({'error': 'Debe proporcionar el médico y el tipo de cita.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            medico = Medico.objects.filter(nombre_medico=nombre_medico).first()
            tipo_cita = TipoCita.objects.filter(nombre_cita=nombre_tipo_cita).first()
        except Medico.DoesNotExist:
            return Response({'error': f'El médico "{nombre_medico}" no existe.'}, status=status.HTTP_400_BAD_REQUEST)
        except TipoCita.DoesNotExist:
            return Response({'error': f'El tipo de cita "{nombre_tipo_cita}" no existe.'}, status=status.HTTP_400_BAD_REQUEST)


        cita_data = request.data.copy()
        print(cita_data, 'cita data aaaa')
        cita_data['medico'] = medico.id
        cita_data['tipo_cita'] = tipo_cita.id

        serializer = CitaSerializer(data=cita_data)
        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        cita = self.get_object()

        # Obtener los valores del request
        nombre_medico = request.data.get('medico')
        nombre_tipo_cita = request.data.get('tipo_cita')
        fecha_hora = request.data.get('fecha_hora')

        # Clonar datos de request y actualizar los campos
        cita_data = {}

        # Si se proporcionaron valores para 'medico' o 'tipo_cita', buscar los objetos correspondientes
        if nombre_medico:
            try:
                medico = Medico.objects.get(nombre_medico=nombre_medico)
                cita_data['medico'] = medico.id
            except Medico.DoesNotExist:
                return Response({'error': f'El médico "{nombre_medico}" no existe.'},
                                status=status.HTTP_400_BAD_REQUEST)

        if nombre_tipo_cita:
            try:
                tipo_cita_obj = TipoCita.objects.get(nombre_cita=nombre_tipo_cita)
                cita_data['tipo_cita'] = tipo_cita_obj.id
            except TipoCita.DoesNotExist:
                return Response({'error': f'El tipo de cita "{nombre_tipo_cita}" no existe.'},
                                status=status.HTTP_400_BAD_REQUEST)

        if fecha_hora:
            cita_data['fecha_hora'] = fecha_hora

        # Serializar y guardar la actualización
        serializer = CitaSerializer(cita, data=cita_data, partial=True)
        if serializer.is_valid():
            serializer.save()  # Guardar los cambios en la base de datos
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

