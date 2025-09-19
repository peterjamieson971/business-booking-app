"use client";

import { useState, useEffect } from 'react';

interface ChatPreferences {
  hasInteracted: boolean;
  isEnabled: boolean;
  lastSeen: string;
}

export function useChat() {
  const [preferences, setPreferences] = useState<ChatPreferences>({
    hasInteracted: false,
    isEnabled: true,
    lastSeen: new Date().toISOString()
  });

  useEffect(() => {
    // Load preferences from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pro-clean-chat-preferences');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setPreferences(parsed);
        } catch (error) {
          console.error('Error parsing chat preferences:', error);
        }
      }
    }
  }, []);

  const updatePreferences = (updates: Partial<ChatPreferences>) => {
    const newPreferences = { ...preferences, ...updates };
    setPreferences(newPreferences);

    if (typeof window !== 'undefined') {
      localStorage.setItem('pro-clean-chat-preferences', JSON.stringify(newPreferences));
    }
  };

  const markAsInteracted = () => {
    updatePreferences({
      hasInteracted: true,
      lastSeen: new Date().toISOString()
    });
  };

  const toggleEnabled = () => {
    updatePreferences({ isEnabled: !preferences.isEnabled });
  };

  return {
    preferences,
    updatePreferences,
    markAsInteracted,
    toggleEnabled
  };
}