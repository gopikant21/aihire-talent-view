
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import JobDetail from '@/components/jobs/JobDetail';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  status: 'open' | 'closed';
  postedDate: string;
}

const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    applicants: 42,
    status: "open",
    postedDate: "2023-04-15",
  },
  {
    id: "2",
    title: "Product Manager",
    department: "Product",
    location: "New York, NY",
    type: "Full-time",
    applicants: 28,
    status: "open",
    postedDate: "2023-04-10",
  },
  {
    id: "3",
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    applicants: 36,
    status: "open",
    postedDate: "2023-04-05",
  },
  {
    id: "4",
    title: "Data Scientist",
    department: "Data",
    location: "Boston, MA",
    type: "Full-time",
    applicants: 18,
    status: "open",
    postedDate: "2023-04-01",
  },
  {
    id: "5",
    title: "Marketing Specialist",
    department: "Marketing",
    location: "Austin, TX",
    type: "Full-time",
    applicants: 24,
    status: "closed",
    postedDate: "2023-03-15",
  },
  {
    id: "6",
    title: "Front-End Developer",
    department: "Engineering",
    location: "Remote",
    type: "Contract",
    applicants: 32,
    status: "open",
    postedDate: "2023-03-10",
  },
  {
    id: "7",
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Seattle, WA",
    type: "Full-time",
    applicants: 16,
    status: "open",
    postedDate: "2023-03-05",
  },
  {
    id: "8",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Chicago, IL",
    type: "Full-time",
    applicants: 20,
    status: "closed",
    postedDate: "2023-03-01",
  },
];

const JobCard = ({ 
  job, 
  onViewDetails, 
  onViewCandidates 
}: { 
  job: Job; 
  onViewDetails: (job: Job) => void;
  onViewCandidates: (job: Job) => void;
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
            {job.status === 'open' ? 'Open' : 'Closed'}
          </Badge>
        </div>
        <CardDescription>{job.department}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{job.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Posted {job.postedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{job.applicants} applicants</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => onViewDetails(job)}>View Details</Button>
        <Button 
          disabled={job.status === 'closed'}
          onClick={() => onViewCandidates(job)}
        >
          {job.status === 'open' ? 'View Candidates' : 'Job Closed'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Jobs = () => {
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailMode, setDetailMode] = useState<'details' | 'candidates'>('details');
  
  const filteredJobs = MOCK_JOBS.filter(job => {
    if (filter === 'all') return true;
    return job.status === filter;
  });
  
  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setDetailMode('details');
    setIsDetailOpen(true);
  };
  
  const handleViewCandidates = (job: Job) => {
    setSelectedJob(job);
    setDetailMode('candidates');
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
          <p className="text-muted-foreground">
            Manage your company's open positions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            onClick={() => setFilter('all')}
            className={cn(filter === 'all' ? 'bg-brand-500 hover:bg-brand-600' : '')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'open' ? 'default' : 'outline'} 
            onClick={() => setFilter('open')}
            className={cn(filter === 'open' ? 'bg-brand-500 hover:bg-brand-600' : '')}
          >
            Open
          </Button>
          <Button 
            variant={filter === 'closed' ? 'default' : 'outline'} 
            onClick={() => setFilter('closed')}
            className={cn(filter === 'closed' ? 'bg-brand-500 hover:bg-brand-600' : '')}
          >
            Closed
          </Button>
          <Button className="bg-brand-500 hover:bg-brand-600">
            Post New Job
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredJobs.map((job) => (
          <JobCard 
            key={job.id} 
            job={job} 
            onViewDetails={handleViewDetails}
            onViewCandidates={handleViewCandidates}
          />
        ))}
      </div>

      <JobDetail 
        job={selectedJob}
        mode={detailMode}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
};

export default Jobs;
