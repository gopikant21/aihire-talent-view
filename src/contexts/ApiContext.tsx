
import React, { createContext, useContext } from 'react';

// API base URL
const API_BASE_URL = 'http://localhost:2900';

interface ApiContextType {
  textToSpeech: (text: string) => Promise<string>;
  speechToText: (audioBlob: Blob, id: string) => Promise<string>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const textToSpeech = async (text: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to convert text to speech');
      }
      
      const data = await response.json();
      return data.audio_url;
    } catch (error) {
      console.error('TTS error:', error);
      throw error;
    }
  };

  const speechToText = async (audioBlob: Blob, id: string): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');
      
      const response = await fetch(`${API_BASE_URL}/api/stt/${id}`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to convert speech to text');
      }
      
      const data = await response.json();
      return data.transcript;
    } catch (error) {
      console.error('STT error:', error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ textToSpeech, speechToText }}>
      {children}
    </ApiContext.Provider>
  );
}

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
