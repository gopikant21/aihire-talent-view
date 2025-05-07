
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const timeData = [
  { name: 'Jan', candidates: 65 },
  { name: 'Feb', candidates: 80 },
  { name: 'Mar', candidates: 73 },
  { name: 'Apr', candidates: 92 },
  { name: 'May', candidates: 105 },
  { name: 'Jun', candidates: 120 },
];

const conversionData = [
  { name: 'Applied → Screening', rate: 58 },
  { name: 'Screening → Interview', rate: 42 },
  { name: 'Interview → Offer', rate: 28 },
  { name: 'Offer → Hired', rate: 20 },
];

const sourceData = [
  { name: 'Job Boards', value: 45 },
  { name: 'Referrals', value: 25 },
  { name: 'Social Media', value: 20 },
  { name: 'Company Website', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const popularRoles = [
  { name: 'Software Engineer', count: 78 },
  { name: 'Product Manager', count: 56 },
  { name: 'UX Designer', count: 42 },
  { name: 'Data Analyst', count: 38 },
  { name: 'Marketing Specialist', count: 32 },
];

const Insights = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Recruitment Insights</h2>
        <p className="text-muted-foreground">
          Analytics and metrics about your hiring process
        </p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="candidates" className="flex-1">Candidates</TabsTrigger>
          <TabsTrigger value="jobs" className="flex-1">Jobs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Candidates Over Time</CardTitle>
                <CardDescription>Number of new applicants each month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="candidates" 
                        stroke="#06adf2" 
                        strokeWidth={2} 
                        activeDot={{ r: 6 }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pipeline Conversion Rates</CardTitle>
                <CardDescription>Percentage of candidates advancing to next stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rate" fill="#06adf2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Candidate Sources</CardTitle>
                <CardDescription>Where candidates are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Roles</CardTitle>
              <CardDescription>Roles with the highest number of applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={popularRoles} 
                    layout="vertical" 
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="count" fill="#06adf2" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="candidates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Detailed Analysis</CardTitle>
              <CardDescription>More in-depth candidate metrics and data</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">Detailed candidate analytics would be shown here</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="jobs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Posting Analytics</CardTitle>
              <CardDescription>Performance metrics for job listings</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <p className="text-muted-foreground">Job performance analytics would be shown here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Insights;
