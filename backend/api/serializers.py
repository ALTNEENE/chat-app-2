from rest_framework import serializers
from .models import User, Profile, ChatMessage, Conversation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'full_name', 'bio', 'image']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, required=True,  
    )
    password2 = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password': 'Password fields do not match.'}
            )
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(username=validated_data["username"], email=validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()
        return user
class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    sender_profile = ProfileSerializer(read_only=True)
    reciver_profile = ProfileSerializer(read_only=True)

    class Meta:
        model = ChatMessage
        fields = ['id', 'sender_profile', 'reciver_profile','message', 'is_read', 'created_at'] 