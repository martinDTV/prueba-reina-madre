from apirest.urls import drf_router
from citas.viewsets import CitaViewSet

urlpatterns = [
]

drf_router.register(r'citas', CitaViewSet, basename='citas')
