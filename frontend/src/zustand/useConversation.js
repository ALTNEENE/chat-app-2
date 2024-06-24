import {create} from 'zustand';

const useConversation = create((set) => ({
    users: null,
    setUsers: (users) => set(({users})),
    selectedConversations: [],
    setSelectedConversations: (selectedConversations) => (set({selectedConversations})),
    selectedConversation: [],
    setSelectedConversation: (selectedConversation) => (set({selectedConversation})),
    messages: [],
    setMessages: (messages) => (set({messages}))
}))

export default useConversation