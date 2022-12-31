from datetime import datetime
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status
from rest_framework.serializers import ModelSerializer

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from transaction.models import Transaction

from django.db import transaction


User = get_user_model()


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = "username"


class TransactionSerializer(ModelSerializer):

    involved_users = UserSerializer(many=True)

    class Meta:
        model = Transaction
        fields = ("id", "owner", "amount", "date", "name", "category", "involved_users")
        extra_kwargs = {
            "owner": {"read_only": True},
            "date": {"read_only": True},
            "id": {"read_only": True},
        }


class TransactionViewSet(ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = (IsAuthenticated,)
    queryset = Transaction.objects.all()

    def get_queryset(self):
        return Transaction.objects.filter(owner=self.request.user)

    # whole money is spent by owner and is split among all involved users equally including owner
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # add default things to transaction
        serializer.date = datetime.now()
        serializer.owner = self.request.user
        usernames = serializer.validated_data["involved_users"]

        user_list = []
        for username in usernames:
            try:
                user = User.objects.get(username=username)
                user_list.append(user)
            except User.DoesNotExist:
                return Response(
                    {"error": [f"User with username: {username}  not found"]},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        with transaction.atomic():

            serializer.save()
            # add involved users to transaction
            serializer.involved_users.set(user_list)

            number_of_involved_users = len(user_list)
            # share of each user + owner
            share = serializer.validated_data["amount"] / (number_of_involved_users + 1)

            # increase money spent by owner and increase owed money for owner
            self.request.user.money_spent += serializer.validated_data["amount"]
            self.request.user.owed += share * number_of_involved_users
            self.request.user.save()

            # increase owe money for each involved user
            for user in user_list:
                user.owe += share
                user.save()

            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data, status=status.HTTP_201_CREATED, headers=headers
            )
