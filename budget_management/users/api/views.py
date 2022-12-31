from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import ModelSerializer, EmailField, CharField

from rest_framework import generics
from rest_framework.viewsets import mixins, GenericViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny

from budget_management.users.models import Friend

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
        fields = ["username", "email", "budget"]


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


# ----------------------- Friend viewset --------------------------------


class CreateFriendSerializer(ModelSerializer):
    friend = CharField(required=True)

    class Meta:
        model = Friend
        fields = ["friend"]


class FriendCreation(generics.CreateAPIView):
    serializer_class = CreateFriendSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        new_frined_username = serializer.validated_data["friend"]
        new_friend = None
        try:
            new_friend = User.objects.get(username=new_frined_username)
        # if user with this username not found
        except (User.DoesNotExist):
            return Response(
                {"error": ["User with this username not found"]},
                status=status.HTTP_400_BAD_REQUEST,
            )
        # check if user is trying to add himself
        if new_friend == request.user:
            return Response(
                {"error": ["You can't add yourself as a friend"]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        Friend.add_friend(request.user, new_friend)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username"]


class ListFriendSerializer(ModelSerializer):
    friends = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Friend
        fields = ["friends"]


class FriendList(generics.ListAPIView):
    serializer_class = ListFriendSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Friend.objects.get_or_create(owner=self.request.user)
