
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, Calendar, Building, ArrowRight } from 'lucide-react';

interface CandidateDetailProps {
  candidate: {
    id: string;
    name: string;
    email: string;
    role: string;
    company: string;
    stage: string;
    avatar: string;
    appliedDate: string;
    phone?: string;
    resume?: string;
    education?: string[];
    experience?: string[];
    skills?: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const getStageBadgeVariant = (stage: string) => {
  switch (stage) {
    case 'applied': return 'secondary';
    case 'screening': return 'outline';
    case 'interview': return 'default';
    case 'offer': return 'destructive';
    default: return 'outline';
  }
};

const CandidateDetail = ({ candidate, isOpen, onClose }: CandidateDetailProps) => {
  if (!candidate) return null;

  // Mock data for additional candidate details
  const phone = candidate.phone || "+1 (123) 456-7890";
  const education = candidate.education || [
    "Bachelor of Science in Computer Science, Stanford University (2018-2022)",
    "High School Diploma, Lincoln High School (2014-2018)"
  ];
  const experience = candidate.experience || [
    `${candidate.company} - Senior Developer (2022-Present)`,
    "Tech Innovations - Junior Developer (2020-2022)"
  ];
  const skills = candidate.skills || [
    "React", "TypeScript", "Node.js", "GraphQL", "UI/UX Design", "Project Management"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidate.avatar} alt={candidate.name} />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl">{candidate.name}</DialogTitle>
              <DialogDescription className="text-base">{candidate.role}</DialogDescription>
              <div className="mt-2">
                <Badge variant={getStageBadgeVariant(candidate.stage)}>
                  {candidate.stage.charAt(0).toUpperCase() + candidate.stage.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{candidate.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Applied on {candidate.appliedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Previous: {candidate.company}</span>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {education.map((edu, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-1 min-w-[16px]" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {experience.map((exp, index) => (
                <li key={index} className="flex items-start gap-2">
                  <ArrowRight className="h-4 w-4 mt-1 min-w-[16px]" />
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline">{skill}</Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Schedule Interview</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CandidateDetail;
