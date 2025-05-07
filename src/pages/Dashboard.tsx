
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Briefcase, Users, Calendar, Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const StatsCard = ({
  title,
  value,
  description,
  icon,
  className,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  className?: string;
}) => (
  <Card className={className}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h2>
        <p className="text-muted-foreground">
          Here's what's happening with your recruitment pipeline today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Jobs"
          value="12"
          description="3 jobs added this week"
          icon={<Briefcase className="h-4 w-4" />}
        />
        <StatsCard
          title="Total Candidates"
          value="342"
          description="↑ 18% from last month"
          icon={<Users className="h-4 w-4" />}
        />
        <StatsCard
          title="Interviews This Week"
          value="28"
          description="12 scheduled for today"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatsCard
          title="Positions Filled"
          value="8"
          description="↑ 2 since last month"
          icon={<Award className="h-4 w-4" />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Application Activity</CardTitle>
            <CardDescription>
              Candidate applications in the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              {/* We'll replace this with actual chart in a real implementation */}
              <div className="w-full space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">Software Engineer</p>
                    <span className="text-sm">48</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">Product Manager</p>
                    <span className="text-sm">32</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">UX Designer</p>
                    <span className="text-sm">24</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm">Data Analyst</p>
                    <span className="text-sm">18</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
            <CardDescription>
              Candidates by stage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Applied</p>
                  <p className="text-2xl font-bold">158</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xl font-bold">1</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Screening</p>
                  <p className="text-2xl font-bold">84</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xl font-bold">2</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Interview</p>
                  <p className="text-2xl font-bold">42</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xl font-bold">3</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Offer</p>
                  <p className="text-2xl font-bold">16</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xl font-bold">4</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
