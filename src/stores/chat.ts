import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from './auth';

interface ChatMessage {
  message: string;
  reply: string;
}

interface FormattedMessage {
  role: 'user' | 'ai';
  content: string;
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<{ role: string; content: string }[]>([]);
  const isLoading = ref(false);

  const authStore = useAuthStore();

  // Load previous chat messages
  const loadChatHistory = async () => {
    if (!authStore.isAuthenticated || !authStore.user) return;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/get-messages`,
        {
          userId: authStore.user?.userId,
        },
        authStore.getAuthHeaders()
      );

      messages.value = data.messages
        .flatMap((msg: ChatMessage): FormattedMessage[] => [
          { role: 'user', content: msg.message },
          { role: 'ai', content: msg.reply },
        ])
        .filter((msg: FormattedMessage) => msg.content);
    } catch (error) {
      console.error('Error loading chat history: ', error);
    }
  };

  // Send new message to AI
  const sendMessage = async (message: string) => {
    if (!message.trim() || !authStore.isAuthenticated || !authStore.user) return;

    if (!authStore.isAuthenticated) {
      messages.value.push({
        role: 'ai',
        content: 'Veuillez vous connecter pour utiliser le chat.',
      });
      return;
    }

    messages.value.push({ role: 'user', content: message });

    isLoading.value = true;

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/chat`,
        {
          message,
          userId: authStore.user?.userId,
        },
        authStore.getAuthHeaders()
      );

      messages.value.push({ role: 'ai', content: data.reply });
    } catch (error) {
      console.error('Error sending message: ', error);
      messages.value.push({
        role: 'ai',
        content: 'Error: unable to process request',
      });
    } finally {
      isLoading.value = false;
    }
  };

  return { messages, isLoading, loadChatHistory, sendMessage };
});