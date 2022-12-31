from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views import defaults as default_views
from django.views.generic import TemplateView

from rest_framework.routers import SimpleRouter
from rest_framework.authtoken import views

from budget_management.users.api.views import (
    UserCreation,
    UserGet,
    FriendCreation,
    FriendList,
    UserEdit,
)
from transaction.api.views import TransactionViewSet


# API URLS
router = SimpleRouter()
router.register("api/user/register", UserCreation)
router.register("api/user/me", UserGet)
router.register("api/transaction", TransactionViewSet)


urlpatterns = (
    [
        path("", TemplateView.as_view(template_name="pages/home.html"), name="home"),
        path(
            "about/",
            TemplateView.as_view(template_name="pages/about.html"),
            name="about",
        ),
        # Django Admin, use {% url 'admin:index' %}
        path(settings.ADMIN_URL, admin.site.urls),
        # User management
        path("users/", include("budget_management.users.urls", namespace="users")),
        path("accounts/", include("allauth.urls")),
        # Your stuff: custom urls includes go here
        path("api/token", views.obtain_auth_token),
        path("api/create-friend/", FriendCreation.as_view()),
        path("api/list-friends/", FriendList.as_view()),
        path("api/user-edit/", UserEdit.as_view()),
    ]
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    + router.urls
)

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
