import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mic, Send, Loader2, Volume2, User, MessageSquare, ChevronRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useApi } from '@/contexts/ApiContext';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  audioUrl?: string;
}

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi, I'm your AI recruitment assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
      audioUrl: ''
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  const { textToSpeech } = useApi();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Example simulated responses
      let response = '';
      if (input.toLowerCase().includes('job')) {
        response = "We currently have 12 open positions. Our most active job is for Senior Software Engineer with 42 applicants so far. Would you like me to list more open positions?";
      } else if (input.toLowerCase().includes('candidate')) {
        response = "We have 342 candidates in our pipeline right now. 158 have applied, 84 are in screening, 42 are in the interview stage, and 16 have received offers.";
      } else if (input.toLowerCase().includes('interview')) {
        response = "There are 28 interviews scheduled this week, with 12 interviews scheduled for today. Would you like me to provide details about any specific candidate?";
      } else {
        response = "I can help you with information about job postings, candidates in your pipeline, or recruitment analytics. What would you like to know?";
      }

      // Generate audio from response text
      let audioUrl = '';
      try {
        audioUrl = await textToSpeech(response);
      } catch (error) {
        console.error('Failed to convert text to speech:', error);
        toast({
          title: 'Audio Error',
          description: 'Failed to generate audio response',
          variant: 'destructive',
        });
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: response,
        sender: 'ai',
        timestamp: new Date(),
        audioUrl: audioUrl,
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: 'Error',
        description: 'Failed to get AI response',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = async (audioUrl: string) => {
    if (audioRef.current) {
      // Stop any currently playing audio
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
    }

    try {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        audioRef.current = null;
      });
      
      audio.addEventListener('error', () => {
        setIsPlaying(false);
        audioRef.current = null;
        toast({
          title: 'Audio Error',
          description: 'Failed to play audio response',
          variant: 'destructive',
        });
      });
      
      setIsPlaying(true);
      await audio.play();
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
      toast({
        title: 'Audio Error',
        description: 'Failed to play audio response',
        variant: 'destructive',
      });
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = async () => {
    try {
      // In a real implementation, we would access the microphone and start recording
      setIsRecording(true);
      toast({
        title: 'Recording started',
        description: 'Listening for your voice input...',
      });
      
      // Simulate recording for 3 seconds
      setTimeout(() => {
        stopRecording();
      }, 3000);
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
      toast({
        title: 'Recording Error',
        description: 'Failed to access microphone',
        variant: 'destructive',
      });
    }
  };

  const stopRecording = async () => {
    // In a real implementation, this would stop recording and send the audio to the API
    setIsRecording(false);
    
    // Simulate processing the audio
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate a transcribed message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: "How many candidates are in the pipeline?",
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, simulate an AI response
    const response = "We have 342 candidates in our pipeline right now. 158 have applied, 84 are in screening, 42 are in the interview stage, and 16 have received offers.";
    
    // Simulate generating audio URL
    const audioUrl = ''; // In a real app, this would be from the API
    
    const aiMessage: Message = {
      id: Date.now().toString(),
      content: response,
      sender: 'ai',
      timestamp: new Date(),
      audioUrl: audioUrl,
    };
    
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQueries = [
    { text: "How many open jobs do we have?", icon: <MessageSquare className="h-4 w-4" /> },
    { text: "Show me candidate statistics", icon: <MessageSquare className="h-4 w-4" /> },
    { text: "When are the next interviews scheduled?", icon: <MessageSquare className="h-4 w-4" /> },
    { text: "What's our conversion rate from interview to offer?", icon: <MessageSquare className="h-4 w-4" /> }
  ];

  const voiceCommands = [
    "How many candidates are in the pipeline?",
    "Show me today's interviews",
    "What's our most popular job posting?",
    "Give me insights on the UX Designer role"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] animate-fade-in">
      <div className="flex-1">
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>AI Recruitment Assistant</CardTitle>
              <CardDescription>
                Ask about jobs, candidates, or get insights about your hiring process
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto h-[calc(100vh-20rem)]">
              <div className="space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div 
                      className={cn(
                        "px-4 py-2 rounded-lg max-w-[80%]",
                        message.sender === 'user' 
                          ? "bg-brand-500 text-white rounded-br-none" 
                          : "bg-muted rounded-bl-none"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {message.sender === 'ai' && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatar-ai.png" alt="AI" />
                            <AvatarFallback className="bg-brand-500 text-white">AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          {message.sender === 'ai' && message.audioUrl && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="mt-1 h-6 text-xs"
                              onClick={() => handlePlayAudio(message.audioUrl!)}
                            >
                              <Volume2 className="h-3 w-3 mr-1" />
                              Play audio
                            </Button>
                          )}
                        </div>
                        {message.sender === 'user' && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatar-user.png" alt="User" />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-lg bg-muted rounded-bl-none">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-brand-500 text-white">AI</AvatarFallback>
                        </Avatar>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            <CardFooter className="border-t p-4">
              <form 
                className="flex items-center w-full gap-2" 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <Button
                  type="button"
                  size="icon"
                  variant={isRecording ? "destructive" : "outline"}
                  onClick={handleMicClick}
                  disabled={isLoading}
                >
                  <Mic className={cn("h-5 w-5", isRecording && "animate-pulse-slow")} />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={isLoading || isRecording}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  disabled={isLoading || isRecording || input.trim() === ''}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </form>
            </CardFooter>
          </Card>
          
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-brand-500" />
                  Quick Queries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                {quickQueries.map((query, index) => (
                  <Button 
                    key={index}
                    variant="ghost" 
                    className="w-full justify-between text-left hover:bg-brand-50 group transition-colors"
                    onClick={() => setInput(query.text)}
                  >
                    <div className="flex items-center">
                      {query.icon}
                      <span className="ml-2">{query.text}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-500 transition-colors" />
                  </Button>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Mic className="h-5 w-5 mr-2 text-brand-500" />
                  Voice Commands
                </CardTitle>
                <CardDescription>
                  Click the microphone button and try saying:
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {voiceCommands.map((command, index) => (
                  <div key={index} className="p-2 rounded-md bg-muted/50 border border-border/50">
                    <p className="text-sm font-medium">"{command}"</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
