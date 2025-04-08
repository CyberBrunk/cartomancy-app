import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define response categories type
type ResponseCategory = 'greeting' | 'cardRequest' | 'meaning' | 'general';

// Mock responses for Katie The Card Lady
const KATIE_RESPONSES: Record<ResponseCategory, string[]> = {
  greeting: [
    "Hello there! I'm Katie, your cartomancy guide. How can I assist you today?",
    "Welcome back to the mystical realm! What guidance are you seeking today?",
    "The cards have been waiting for you. What would you like to know?"
  ],
  cardRequest: [
    "I've drawn the Seven of Hearts for you. This card speaks of emotional reflection and insight. It suggests taking time to understand your feelings before making decisions.",
    "The Queen of Spades appears for you today. She represents wisdom and intuition. Trust your inner knowing as you navigate your current situation.",
    "I see the Ace of Diamonds has revealed itself. This card signifies new beginnings and opportunities, especially in material matters. Be open to fresh possibilities."
  ],
  meaning: [
    "The Seven of Hearts represents emotional reflection, intuition, and inner wisdom. It often appears when you need to trust your feelings about a situation.",
    "The Queen of Spades symbolizes a wise, perceptive woman or these qualities within yourself. She sees beyond illusions and can help you discern truth.",
    "The Ace of Diamonds signifies new beginnings in material matters - perhaps a new job, financial opportunity, or creative project with tangible results."
  ],
  general: [
    "The cards suggest taking time for self-reflection before making your next move. Your intuition knows the way forward.",
    "I sense that balance is key for you right now. Consider how you might harmonize different aspects of your life.",
    "The energy around you is shifting toward growth and expansion. This is an excellent time to plant seeds for future harvest."
  ]
};

// Get a random response from a category
const getRandomResponse = (category: ResponseCategory): string => {
  const responses = KATIE_RESPONSES[category] || KATIE_RESPONSES.general;
  return responses[Math.floor(Math.random() * responses.length)];
};

// Message types
type Message = {
  id: string;
  text: string;
  sender: 'user' | 'katie';
  timestamp: number;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const colorScheme = useColorScheme();
  
  // Load chat history on component mount
  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('chatMessages');
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages));
        } else {
          // First-time greeting
          const greeting: Message = {
            id: Date.now().toString(),
            text: getRandomResponse('greeting'),
            sender: 'katie',
            timestamp: Date.now()
          };
          setMessages([greeting]);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
        // Fallback greeting
        const greeting: Message = {
          id: Date.now().toString(),
          text: "Hello there! I'm Katie, your cartomancy guide. How can I assist you today?",
          sender: 'katie',
          timestamp: Date.now()
        };
        setMessages([greeting]);
      }
    };
    
    loadChatHistory();
  }, []);
  
  // Save messages to AsyncStorage whenever they change
  useEffect(() => {
    const saveChatHistory = async () => {
      try {
        await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
    };
    
    if (messages.length > 0) {
      saveChatHistory();
    }
  }, [messages]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    // Simulate Katie typing
    setIsTyping(true);
    
    // Determine response category based on user input
    let responseCategory: ResponseCategory = 'general';
    const lowerInput = inputText.toLowerCase();
    
    if (lowerInput.includes('card') && (lowerInput.includes('draw') || lowerInput.includes('today'))) {
      responseCategory = 'cardRequest';
    } else if (lowerInput.includes('mean') || lowerInput.includes('interpret')) {
      responseCategory = 'meaning';
    }
    
    // Simulate response delay
    setTimeout(() => {
      const katieResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(responseCategory),
        sender: 'katie',
        timestamp: Date.now()
      };
      
      setMessages(prev => [...prev, katieResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const renderMessage = ({ item }: { item: Message }) => {
    const isKatie = item.sender === 'katie';
    
    return (
      <ThemedView 
        style={[
          styles.messageContainer,
          isKatie ? styles.katieMessage : styles.userMessage
        ]}
      >
        {isKatie && (
          <View style={styles.avatarContainer}>
            <IconSymbol size={24} name="person.circle.fill" color="#9C27B0" />
          </View>
        )}
        <ThemedView 
          style={[
            styles.messageBubble,
            isKatie ? styles.katieBubble : styles.userBubble
          ]}
        >
          <ThemedText style={isKatie ? styles.katieText : styles.userText}>
            {item.text}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  };
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ThemedView style={styles.header}>
        <ThemedText type="title">Katie The Card Lady</ThemedText>
      </ThemedView>
      
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
      />
      
      {isTyping && (
        <ThemedView style={styles.typingIndicator}>
          <ThemedText style={styles.typingText}>Katie is typing...</ThemedText>
        </ThemedView>
      )}
      
      <ThemedView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask Katie about your cards..."
          placeholderTextColor="#999"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={inputText.trim() === ''}
          activeOpacity={0.7}
        >
          <IconSymbol 
            size={24} 
            name="arrow.up.circle.fill" 
            color={inputText.trim() === '' ? '#ccc' : '#9C27B0'} 
          />
        </TouchableOpacity>
      </ThemedView>
      
      <ThemedView style={styles.suggestionContainer}>
        <TouchableOpacity 
          style={styles.suggestionButton}
          onPress={() => setInputText("What's my card for today?")}
        >
          <ThemedText style={styles.suggestionText}>Draw a card</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.suggestionButton}
          onPress={() => setInputText("What does the Queen of Hearts mean?")}
        >
          <ThemedText style={styles.suggestionText}>Card meaning</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.suggestionButton}
          onPress={() => setInputText("Give me guidance for today")}
        >
          <ThemedText style={styles.suggestionText}>Daily guidance</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  messagesList: {
    padding: 16,
    paddingBottom: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '80%',
  },
  katieMessage: {
    alignSelf: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  avatarContainer: {
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
  },
  katieBubble: {
    backgroundColor: '#F3E5F5',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: '#E1F5FE',
    borderBottomRightRadius: 4,
  },
  katieText: {
    color: '#4A148C',
  },
  userText: {
    color: '#01579B',
  },
  typingIndicator: {
    padding: 8,
    marginLeft: 16,
  },
  typingText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#9e9e9e',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    padding: 4,
  },
  suggestionContainer: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
  },
  suggestionButton: {
    backgroundColor: '#F3E5F5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  suggestionText: {
    fontSize: 12,
    color: '#9C27B0',
  },
});
