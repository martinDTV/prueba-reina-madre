from apirest.urls import drf_router
from configuracion.viewsets import MedicoViewSet, TipoCitaViewSet

urlpatterns = [
]

drf_router.register(r'medicos', MedicoViewSet, basename='medicos')
drf_router.register(r'tipo-cita', TipoCitaViewSet, basename='tipo-cita')
