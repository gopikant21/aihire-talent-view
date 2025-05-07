
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Calendar, Users, X } from 'lucide-react';

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
  isOpen: boolean;
  onClose: () => void;
}

const JobDetail = ({ job, isOpen, onClose }: JobDetailProps) => {
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
        
        <div className="flex justify-between items-center mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button disabled={job.status === 'closed'}>
            {job.status === 'open' ? 'View Candidates' : 'Job Closed'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobDetail;
