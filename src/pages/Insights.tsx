import React, { useState } from 'react';
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

// Summary metrics data
const summaryMetrics = [
  { title: 'Total Candidates', value: '535', change: '+12%', icon: '📈' },
  { title: 'Time to Hire', value: '24 days', change: '-3 days', icon: '⏱️' },
  { title: 'Open Positions', value: '18', change: '+4', icon: '🔍' },
  { title: 'Offer Acceptance', value: '86%', change: '+6%', icon: '📝' },
];

const Insights = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="w-full px-4 py-6 space-y-8 mx-auto max-w-7xl animate-in fade-in duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Recruitment Insights</h2>
        <p className="text-muted-foreground">
          Analytics and metrics about your hiring process
        </p>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <TabsList className="h-10">
            <TabsTrigger value="overview" className="px-4">Overview</TabsTrigger>
            <TabsTrigger value="candidates" className="px-4">Candidates</TabsTrigger>
            <TabsTrigger value="jobs" className="px-4">Jobs</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {summaryMetrics.map((metric, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    <span className="text-2xl">{metric.icon}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className={`text-sm ${metric.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Time-series chart */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle>Candidates Over Time</CardTitle>
              <CardDescription>Number of new applicants each month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timeData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '6px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="candidates" 
                      stroke="#06adf2" 
                      strokeWidth={2} 
                      activeDot={{ r: 6 }} 
                      dot={{ stroke: '#06adf2', strokeWidth: 1, fill: 'white', r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Two-column charts layout */}
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Pipeline Conversion Rates</CardTitle>
                <CardDescription>Percentage of candidates advancing to next stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={conversionData} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ borderRadius: '6px' }} />
                      <Bar dataKey="rate" fill="#06adf2" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden">
              <CardHeader className="pb-0">
                <CardTitle>Candidate Sources</CardTitle>
                <CardDescription>Where candidates are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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
                      <Tooltip contentStyle={{ borderRadius: '6px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Horizontal bar chart */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle>Most Popular Roles</CardTitle>
              <CardDescription>Roles with the highest number of applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={popularRoles} 
                    layout="vertical"
                    margin={{ top: 10, right: 20, left: 40, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ borderRadius: '6px' }} />
                    <Bar dataKey="count" fill="#06adf2" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="candidates" className="mt-6">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Candidate Demographics</CardTitle>
                <CardDescription>Distribution by experience level and location</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-muted-foreground text-center p-6 border border-dashed rounded-lg w-full">
                  <p className="mb-2">Demographic charts would appear here</p>
                  <p className="text-sm">Showing distribution by experience, location and education</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skill Distribution</CardTitle>
                <CardDescription>Top skills among candidates</CardDescription>
              </CardHeader>
              <CardContent className="h-96 flex items-center justify-center">
                <div className="text-muted-foreground text-center p-6 border border-dashed rounded-lg w-full">
                  <p className="mb-2">Skill distribution chart would appear here</p>
                  <p className="text-sm">Showing most common skills across all candidates</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="jobs" className="mt-6">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Job Views vs. Applications</CardTitle>
                <CardDescription>Conversion rate for job listings</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-muted-foreground text-center p-6 border border-dashed rounded-lg w-full">
                  <p className="mb-2">Job conversion chart would appear here</p>
                  <p className="text-sm">Showing view-to-application rates by position</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Time to Fill by Department</CardTitle>
                <CardDescription>Average days to fill positions</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-muted-foreground text-center p-6 border border-dashed rounded-lg w-full">
                  <p className="mb-2">Time to fill chart would appear here</p>
                  <p className="text-sm">Showing average hiring timeline by department</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Insights;