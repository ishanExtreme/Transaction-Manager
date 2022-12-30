from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "budget_management.users"
    verbose_name = _("Users")

    def ready(self):
        try:
            import budget_management.users.signals  # noqa F401
        except ImportError:
            pass
