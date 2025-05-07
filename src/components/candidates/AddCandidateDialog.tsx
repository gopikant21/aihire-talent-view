
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddCandidateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCandidate: (candidate: any) => void;
}

const AddCandidateDialog = ({ isOpen, onClose, onAddCandidate }: AddCandidateDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new candidate object with form data
    const newCandidate = {
      ...formData,
      id: `candidate-${Date.now()}`,
      stage: 'applied',
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
      appliedDate: new Date().toISOString().split('T')[0],
      applicants: 0,
    };
    
    onAddCandidate(newCandidate);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Candidate</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Applied Position</Label>
            <Input
              id="role"
              name="role"
              placeholder="Software Engineer"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Previous Company</Label>
            <Input
              id="company"
              name="company"
              placeholder="Previous Employer"
              value={formData.company}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Candidate</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCandidateDialog;
