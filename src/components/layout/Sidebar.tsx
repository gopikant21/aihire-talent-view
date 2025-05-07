
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Briefcase, 
  Users, 
  BarChart, 
  MessageSquare 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ to, icon, label }: NavItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => cn(
      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-base font-medium",
      isActive 
        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
    )}
  >
    <span className="h-5 w-5">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

const Sidebar = () => {
  const { user } = useAuth();
  
  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-border bg-sidebar">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 px-2">
          <div className="h-8 w-8 rounded-md bg-brand-500 flex items-center justify-center text-white font-bold">
            AI
          </div>
          <h1 className="text-xl font-bold">Dokkaabi</h1>
        </div>
      </div>
      
      <div className="flex-1 py-6 flex flex-col space-y-1 px-3">
        <NavItem to="/dashboard" icon={<Home size={20} />} label="Dashboard" />
        <NavItem to="/jobs" icon={<Briefcase size={20} />} label="Jobs" />
        <NavItem to="/candidates" icon={<Users size={20} />} label="Candidates" />
        <NavItem to="/insights" icon={<BarChart size={20} />} label="Insights" />
        <NavItem to="/chatbot" icon={<MessageSquare size={20} />} label="AI Assistant" />
      </div>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-2">
          {user?.avatar && (
            <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
              <img src={user.avatar} alt="User" className="h-full w-full object-cover" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-xs text-muted-foreground">{user?.company}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
