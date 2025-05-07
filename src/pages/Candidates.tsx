
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Stage = 'applied' | 'screening' | 'interview' | 'offer';

interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  stage: Stage;
  avatar: string;
  appliedDate: string;
}

const stages: { value: Stage; label: string; count: number }[] = [
  { value: 'applied', label: 'Applied', count: 158 },
  { value: 'screening', label: 'Screening', count: 84 },
  { value: 'interview', label: 'Interview', count: 42 },
  { value: 'offer', label: 'Offer', count: 16 },
];

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "1",
    name: "Jordan Lee",
    email: "jordan.lee@example.com",
    role: "Senior Software Engineer",
    company: "TechCorp",
    stage: "interview",
    avatar: "https://i.pravatar.cc/150?img=1",
    appliedDate: "2023-04-12",
  },
  {
    id: "2",
    name: "Taylor Morgan",
    email: "taylor.morgan@example.com",
    role: "Product Manager",
    company: "InnovateCo",
    stage: "screening",
    avatar: "https://i.pravatar.cc/150?img=2",
    appliedDate: "2023-04-10",
  },
  {
    id: "3",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    role: "UX Designer",
    company: "DesignStudio",
    stage: "applied",
    avatar: "https://i.pravatar.cc/150?img=3",
    appliedDate: "2023-04-08",
  },
  {
    id: "4",
    name: "Casey Williams",
    email: "casey.williams@example.com",
    role: "Data Scientist",
    company: "DataInsight",
    stage: "offer",
    avatar: "https://i.pravatar.cc/150?img=4",
    appliedDate: "2023-04-05",
  },
  {
    id: "5",
    name: "Riley Brown",
    email: "riley.brown@example.com",
    role: "Frontend Developer",
    company: "WebTech",
    stage: "applied",
    avatar: "https://i.pravatar.cc/150?img=5",
    appliedDate: "2023-04-03",
  },
  {
    id: "6",
    name: "Jamie Garcia",
    email: "jamie.garcia@example.com",
    role: "DevOps Engineer",
    company: "CloudSys",
    stage: "screening",
    avatar: "https://i.pravatar.cc/150?img=6",
    appliedDate: "2023-03-30",
  },
  {
    id: "7",
    name: "Robin Taylor",
    email: "robin.taylor@example.com",
    role: "Marketing Specialist",
    company: "MarketEdge",
    stage: "interview",
    avatar: "https://i.pravatar.cc/150?img=7",
    appliedDate: "2023-03-28",
  },
  {
    id: "8",
    name: "Sam Wilson",
    email: "sam.wilson@example.com",
    role: "Customer Success Manager",
    company: "ServiceFirst",
    stage: "applied",
    avatar: "https://i.pravatar.cc/150?img=8",
    appliedDate: "2023-03-25",
  },
  {
    id: "9",
    name: "Dylan Murphy",
    email: "dylan.murphy@example.com",
    role: "Backend Engineer",
    company: "CodeWorks",
    stage: "screening",
    avatar: "https://i.pravatar.cc/150?img=9",
    appliedDate: "2023-03-22",
  },
  {
    id: "10",
    name: "Avery Martinez",
    email: "avery.martinez@example.com",
    role: "Project Manager",
    company: "ProjectPro",
    stage: "interview",
    avatar: "https://i.pravatar.cc/150?img=10",
    appliedDate: "2023-03-20",
  },
];

const getStageBadgeVariant = (stage: Stage) => {
  switch (stage) {
    case 'applied': return 'secondary';
    case 'screening': return 'outline';
    case 'interview': return 'default';
    case 'offer': return 'destructive';
    default: return 'outline';
  }
};

const CandidateCard = ({ candidate }: { candidate: Candidate }) => (
  <Card>
    <CardHeader className="flex flex-row items-start justify-between pb-2">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={candidate.avatar} alt={candidate.name} />
          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{candidate.name}</CardTitle>
          <CardDescription className="line-clamp-1">{candidate.role}</CardDescription>
        </div>
      </div>
      <Badge variant={getStageBadgeVariant(candidate.stage)}>
        {candidate.stage.charAt(0).toUpperCase() + candidate.stage.slice(1)}
      </Badge>
    </CardHeader>
    <CardContent>
      <div className="text-sm">
        <p className="text-muted-foreground mb-1">Previous: {candidate.company}</p>
        <p>Applied on: {candidate.appliedDate}</p>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm">View Profile</Button>
        <Button size="sm">Review</Button>
      </div>
    </CardContent>
  </Card>
);

const Candidates = () => {
  const [currentStage, setCurrentStage] = useState<Stage | 'all'>('all');
  
  const filteredCandidates = MOCK_CANDIDATES.filter(candidate => {
    if (currentStage === 'all') return true;
    return candidate.stage === currentStage;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Candidates</h2>
        <p className="text-muted-foreground">
          Browse and manage candidates in your hiring pipeline
        </p>
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setCurrentStage(value as Stage | 'all')}>
        <div className="flex justify-between items-center">
          <TabsList className="grid grid-cols-5 w-fit">
            <TabsTrigger value="all">All ({MOCK_CANDIDATES.length})</TabsTrigger>
            {stages.map(stage => (
              <TabsTrigger key={stage.value} value={stage.value}>
                {stage.label} ({stage.count})
              </TabsTrigger>
            ))}
          </TabsList>
          <Button className="bg-brand-500 hover:bg-brand-600">Add Candidate</Button>
        </div>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCandidates.map(candidate => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
          </div>
        </TabsContent>
        
        {stages.map(stage => (
          <TabsContent key={stage.value} value={stage.value} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCandidates.map(candidate => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Candidates;
