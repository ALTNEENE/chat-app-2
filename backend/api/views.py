from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import RegisterSerializer, ProfileSerializer, ConversationSerializer, ChatMessageSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, Profile, ChatMessage, Conversation
from django.db.models import Subquery, OuterRef, Q
# Create your views here.

class RegisterAipView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class Profiles(generics.ListCreateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return Profile.objects.exclude(user=user).order_by("-id")
    
class ProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [AllowAny]
    queryset = Profile.objects.all()

class SendMessage(generics.CreateAPIView):
    serializer_class = ChatMessageSerializer
    
    def perform_create(self, serializer):
        reciver_id = self.kwargs["reciver_id"]
        profile = Profile.objects.get(pk=reciver_id)
        reciver = profile.user
        conversation = Conversation.objects.filter(members__in=[reciver]).filter(members__in=[self.request.user.id])

        if not conversation:
            conversation = Conversation.objects.create()
            conversation.members.add(self.request.user)
            conversation.members.add(reciver)
            serializer.save(conversation=conversation, sender=self.request.user, reciver=reciver)
        else:
            try:
                conversation = Conversation.objects.filter(members__in=[reciver]).get(members__in=[self.request.user.id])
                serializer.save(conversation=conversation, reciver_id=reciver_id, sender_id=self.request.user.id)
            except:
                print(serializer.error)


class GetMessages(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        reciver = self.kwargs["reciver"]
        try:
            conversation = Conversation.objects.filter(members__in=[reciver]).get(members__in=[self.request.user])
            return ChatMessage.objects.filter(conversation=conversation)
        except:
            print("No messages to fetch . . .")
        


"""class InboxView(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs["user_id"]
        filter(
            id__in=Subquery(
                User.objects.filter(
                    Q(sender__reciver=user_id)|
                    Q(reciver__sender=user_id)
                ).distinct().annotate(
                    last_msg=Subquery(
                        ChatMessage.objects.filter(
                            Q(sender=OuterRef('id'), reciver=user_id)|
                            Q(reciver=OuterRef('id'), sender=user_id)
                        ).order_by("-id")[:1].values_list("id", flat=True)
                    )
                ).values_list("last_msg", flat=True).order_by("-id")
            )
        ).order_by("-id")
        messages = ChatMessage.objects.filter(sender=user_id)
        return messages
    
class GetMessages(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, **kwargs):
        sender_id = self.kwargs["sender_id"]
        reciver_id = self.kwargs["reciver_id"]

        messages = ChatMessage.objects.filter(
            sender__in=(sender_id, reciver_id),
            reciver__in=(sender_id, reciver_id)
        )
        return messages


class SearchUser(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        username = self.kwargs["username"]
        logged_in_user = self.request.user
        users = Profile.objects.filter(
            Q(user__username__icontains=username) |
            Q(email__icontains=username) |
            Q(full_name__icontains=username)
        )
        if not users.exists():
            return Response(
                {"detail": "user dos not exists"},
                status=status.HTTP_404_NOT_FOUND
            )
        
        serializer = self.get_serializer(users, many=True)
        return Response(serializer.data)"""