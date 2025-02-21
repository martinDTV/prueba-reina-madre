from django.urls import include, path
from rest_framework import routers
from users.viewsets import AuthTokenViewset, LogoutViewset

drf_router = routers.DefaultRouter()
drf_router.register(r'login', AuthTokenViewset, basename='login')
drf_router.register(r'logout', LogoutViewset, basename='logout')

app_name = 'apirest'

urlpatterns = [
    path('citas/', include('citas.urls')),
    path('configuracion', include('configuracion.urls')),
    path('', include(drf_router.urls)),
]

urlpatterns += drf_router.urls