from django.contrib.auth.models import AbstractUser
from django.db.models import CharField
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.db import models


class User(AbstractUser):
    """
    Default custom user model for budget_management.
    If adding fields that need to be filled at user signup,
    check forms.SignupForm and forms.SocialSignupForms accordingly.
    """

    #: First and last name do not cover name patterns around the globe
    name = CharField(_("Name of User"), blank=True, max_length=255)
    first_name = None  # type: ignore
    last_name = None  # type: ignore

    def get_absolute_url(self):
        """Get url for user's detail view.

        Returns:
            str: URL for user detail.

        """
        return reverse("users:detail", kwargs={"username": self.username})


class Friend(models.Model):

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner')
    friends = models.ManyToManyField(User, null=True)

    # add new user to friend list
    @classmethod
    def add_friend(cls, curr_user, new_friend):
        friend, create = cls.objects.get_or_create(owner=curr_user)
        friend.friends.add(new_friend)
