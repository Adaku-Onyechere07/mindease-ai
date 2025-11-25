import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, getChatSessions, getChatSession, updateChatSession, deleteChatSession } from "../lib/api";

export function useChat(sessionId) {
  const queryClient = useQueryClient();

  const createSession = useMutation({
    mutationFn: async () => {
      const res = await api.post("/chat/sessions");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chatSessions"]);
    },
  });

  const sendMessage = useMutation({
    mutationFn: async ({ sessionId, message }) => {
      const res = await api.post(`/chat/sessions/${sessionId}/messages`, { content: message });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chatSession", sessionId]);
    },
  });

  const renameSession = useMutation({
    mutationFn: async ({ sessionId, title }) => {
      return updateChatSession(sessionId, { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chatSessions"]);
      queryClient.invalidateQueries(["chatSession", sessionId]);
    },
  });

  const deleteSession = useMutation({
    mutationFn: async (sessionId) => {
      return deleteChatSession(sessionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["chatSessions"]);
    },
  });

  const sessions = useQuery({
    queryKey: ["chatSessions"],
    queryFn: getChatSessions,
  });

  const currentSession = useQuery({
    queryKey: ["chatSession", sessionId],
    queryFn: () => getChatSession(sessionId),
    enabled: !!sessionId,
  });

  return { createSession, sendMessage, renameSession, deleteSession, sessions, currentSession };
}

