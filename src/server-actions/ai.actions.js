"use server";

import { askTutor } from "@/services/ai.service";

export async function askTutorAction(question, contextTopic) {
  if (!question) throw new Error("Question required");

  try {
      const response = await askTutor(question, contextTopic);
      return { success: true, answer: response };
  } catch (error) {
      console.error("AI Tutor Action Error:", error);
      return { success: false, error: "Failed to connect to the learning assistant." };
  }
}
