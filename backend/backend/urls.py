
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserInfoView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from rest_framework.request import Request
from rest_framework.response import Response
from django.conf import settings
from django.utils import timezone
from rest_framework.views import APIView
from django.middleware.csrf import get_token
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        access_token = response.data["access"]

        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=access_token,
            domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
            path=settings.SIMPLE_JWT["AUTH_COOKIE_PATH"],
            expires=timezone.now() + settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )

        csrf_token = get_token(request)
        response.set_cookie(
            key='csrftoken',
            value=csrf_token,
            domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
            path='/',
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=False,  # CSRF cookie must be readable by JavaScript
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )

        response.data['csrf_token'] = csrf_token
        
        print("Response: ", response.data)
        return response
class CustomCookieTokenRefreshView(TokenRefreshView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        access_token = response.data["access"]
        expires = timezone.now() + settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"]

        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=access_token,
            expires=expires,
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"]
        )
        return response

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()

            response = Response(status=204)
    
            csrf_token = get_token(request)
            response.set_cookie(
                key='csrftoken',
                value=csrf_token,
                domain=settings.SIMPLE_JWT["AUTH_COOKIE_DOMAIN"],
                path='/',
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                httponly=False, 
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
            )
            
            return response
        except Exception as e:
            return Response(status=400)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/signup/', CreateUserView.as_view(), name='signup'),
    path('api/user', UserInfoView.as_view(), name='userinfo'),
    path('api/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', CustomCookieTokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api-auth/', include('rest_framework.urls')),
    path ('api/', include('api.urls'))
]
