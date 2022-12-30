from django.contrib.auth import get_user_model
from rest_framework.serializers import (
    ModelSerializer,
    EmailField,
)

from rest_framework.viewsets import mixins, GenericViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny

User = get_user_model()


class UserCreationSerializer(ModelSerializer):
    email = EmailField(required=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserGetSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email"]


# Register User
class UserCreation(mixins.CreateModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreationSerializer
    permission_classes = (AllowAny,)


# Get user via token
class UserGet(mixins.ListModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserGetSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.filter(username=self.request.user.username)
