from django.db import models

from django.contrib.auth import get_user_model

User = get_user_model()


class Transaction(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    involved_users = models.ManyToManyField(User, related_name="involved_users")
    non_members = models.CharField(max_length=1000, blank=True)

    def __str__(self):
        return f"{self.owner} - {self.amount}"
