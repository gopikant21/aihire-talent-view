
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar, Users } from 'lucide-react';

interface JobDetailProps {
  job: {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    applicants: number;
    status: 'open' | 'closed';
    postedDate: string;
    description?: string;
    requirements?: string[];
    responsibilities?: string[];
  } | null;
  mode: 'details' | 'candidates';
  isOpen: boolean;
  onClose: () => void;
}

const JobDetail = ({ job, mode, isOpen, onClose }: JobDetailProps) => {
  if (!job) return null;

  // Mock data for the job description
  const description = job.description || "We are looking for an experienced professional to join our team. The ideal candidate will have a proven track record in the industry and be passionate about driving innovation.";
  const requirements = job.requirements || [
    "Bachelor's degree or equivalent experience",
    "3+ years of relevant experience",
    "Strong communication skills",
    "Ability to work in a fast-paced environment",
    "Problem-solving mindset"
  ];
  const responsibilities = job.responsibilities || [
    "Collaborate with cross-functional teams",
    "Drive projects from conception to completion",
    "Identify opportunities for improvement",
    "Provide regular status updates",
    "Mentor junior team members"
  ];

  // Mock candidates for this job
  const mockCandidates = [
    {
      id: "c1",
      name: "Alex Johnson",
      role: job.title,
      stage: "screening",
      appliedDate: "2023-04-08",
    },
    {
      id: "c2",
      name: "Taylor Morgan",
      role: job.title,
      stage: "interview",
      appliedDate: "2023-04-10",
    },
    {
      id: "c3",
      name: "Jordan Lee",
      role: job.title,
      stage: "applied",
      appliedDate: "2023-04-12",
    }
  ];

  const getStageBadgeVariant = (stage: string) => {
    switch (stage) {
      case 'applied': return 'secondary';
      case 'screening': return 'outline';
      case 'interview': return 'default';
      case 'offer': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{job.title}</DialogTitle>
              <DialogDescription>{job.department}</DialogDescription>
            </div>
            <Badge variant={job.status === 'open' ? 'default' : 'secondary'}>
              {job.status === 'open' ? 'Open' : 'Closed'}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Posted {job.postedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{job.applicants} applicants</span>
          </div>
        </div>
        
        {mode === 'details' ? (
          // Job Details View
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          // Candidates View
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Current Applicants</h3>
            
            {job.status === 'open' ? (
              <div className="space-y-4">
                {mockCandidates.map((candidate) => (
                  <div 
                    key={candidate.id}
                    className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h4 className="font-medium">{candidate.name}</h4>
                      <p className="text-sm text-muted-foreground">Applied: {candidate.appliedDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getStageBadgeVariant(candidate.stage)}>
                        {candidate.stage.charAt(0).toUpperCase() + candidate.stage.slice(1)}
                      </Badge>
                      <Button size="sm">Review</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground p-4 text-center bg-muted/50 rounded-md">
                This job posting is closed and no longer accepting applications.
              </p>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {mode === 'details' ? (
            <Button disabled={job.status === 'closed'}>
              {job.status === 'open' ? 'Apply Now' : 'Job Closed'}
            </Button>
          ) : (
            <Button disabled={job.status === 'closed'}>
              {job.status === 'open' ? 'Export Candidates' : 'Job Closed'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetail;
