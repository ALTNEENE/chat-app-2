from django.urls import path
from . import views

urlpatterns = [
    #path('my-messages/<user_id>', views.InboxView.as_view()),
    path('messages/<int:reciver>', views.GetMessages.as_view()),
    path('send-message/<int:reciver_id>', views.SendMessage.as_view(),),
    path('profile/<int:pk>', views.Profiles.as_view()),
    path('profileDetail/<int:pk>', views.ProfileDetail.as_view()),
    #path('search/username', views.SearchUser.as_view()),
]