from typing import Any, Iterable
from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ("username",)

    def profile(self):
        profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=100)
    bio = models.CharField(max_length=200)
    image = models.ImageField(default='media/avatar.jpg', upload_to="media")
    verified = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.full_name == "":
            self.full_name = self.user.username
        return super().save(*args, **kwargs)

    def __str__(self):
        return self.full_name

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

class Conversation(models.Model):
    members = models.ManyToManyField(User, related_name='conversations')
    created_at = models.DateTimeField(auto_now_add=True)

class ChatMessage(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sender')
    reciver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reciver')
    message = models.TextField()
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, null=True, related_name='messages')
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def sender_profile(self):
        sender_profile = Profile.objects.get(user=self.sender)
        return sender_profile
    
    @property
    def reciver_profile(self):
        reciver_profile = Profile.objects.get(user=self.reciver)
        return reciver_profile

    class Meta:
        ordering = ["created_at"]
        verbose_name_plural = "Messages"

    def __str__(self):

        return f"{self.sender} - {self.reciver}"