
import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const Topbar = () => {
  const { logout } = useAuth();
  
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2 md:hidden">
          <div className="h-8 w-8 rounded-md bg-brand-500 flex items-center justify-center text-white font-bold">
            AI
          </div>
          <h1 className="text-xl font-bold">AIHire</h1>
        </div>
        
        <div className="hidden md:flex md:flex-1 md:items-center md:gap-4 md:px-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="w-full pl-8 bg-background" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="outline" onClick={logout} className="hidden md:inline-flex">
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
