import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  MapPin,
  Calendar,
  Users,
  Search,
  Plus,
  Loader2,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";
import JobDetail from "@/components/jobs/JobDetail";
import { Input } from "@/components/ui/input";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  status: "open" | "closed";
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
  onViewCandidates,
}: {
  job: Job;
  onViewDetails: (job: Job) => void;
  onViewCandidates: (job: Job) => void;
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:border-brand-400 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{job.title}</CardTitle>
          <Badge
            variant={job.status === "open" ? "default" : "secondary"}
            className={job.status === "open" ? "bg-green-500" : ""}
          >
            {job.status === "open" ? "Open" : "Closed"}
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {job.department}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
    <div className="flex items-center gap-2">
      <MapPin className="h-4 w-4 text-brand-500" />
      <span className="text-sm">{job.location}</span>
    </div>
    <div className="flex items-center gap-2">
      <Briefcase className="h-4 w-4 text-brand-500" />
      <span className="text-sm">{job.type}</span>
    </div>
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-brand-500" />
      <span className="text-sm">Posted {job.postedDate}</span>
    </div>
    <div className="flex items-center gap-2">
      <Users className="h-4 w-4 text-brand-500" />
      <span className="text-sm">{job.applicants} applicants</span>
    </div>
  </div>
</CardContent>

      <CardFooter className="flex justify-between gap-2 pt-4">
        <Button
          variant="outline"
          onClick={() => onViewDetails(job)}
          className="flex-1 transition-colors hover:text-brand-500 hover:border-brand-500"
        >
          View Details
        </Button>
        <Button
          disabled={job.status === "closed"}
          onClick={() => onViewCandidates(job)}
          className={cn(
            "flex-1",
            job.status === "open" ? "bg-brand-500 hover:bg-brand-600" : ""
          )}
        >
          {job.status === "open" ? "View Candidates" : "Job Closed"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Jobs = () => {
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailMode, setDetailMode] = useState<"details" | "candidates">(
    "details"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Simulate loading effect on filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [filter, searchQuery]);

  const filteredJobs = MOCK_JOBS.filter((job) => {
    // Filter by status
    if (filter !== "all" && job.status !== filter) return false;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.department.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setDetailMode("details");
    setIsDetailOpen(true);
  };

  const handleViewCandidates = (job: Job) => {
    setSelectedJob(job);
    setDetailMode("candidates");
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Jobs</h2>
            <p className="text-muted-foreground">
              Manage your company's open positions
            </p>
          </div>
          <Button
            className="sm:hidden flex items-center gap-2 bg-brand-500 hover:bg-brand-600"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter className="h-4 w-4" />
            {showMobileFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          <div className="hidden sm:flex items-center gap-2">
            <Button
              variant="outline"
              className="bg-brand-500 hover:bg-brand-600 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div
          className={cn(
            "grid gap-4",
            showMobileFilters || "hidden sm:grid",
            "sm:grid-cols-[1fr_auto]"
          )}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, department, or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex justify-between gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
              className={cn(
                "flex-1 sm:flex-initial",
                filter === "all" ? "bg-brand-500 hover:bg-brand-600" : ""
              )}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filter === "open" ? "default" : "outline"}
              onClick={() => setFilter("open")}
              className={cn(
                "flex-1 sm:flex-initial",
                filter === "open" ? "bg-brand-500 hover:bg-brand-600" : ""
              )}
              size="sm"
            >
              Open
            </Button>
            <Button
              variant={filter === "closed" ? "default" : "outline"}
              onClick={() => setFilter("closed")}
              className={cn(
                "flex-1 sm:flex-initial",
                filter === "closed" ? "bg-brand-500 hover:bg-brand-600" : ""
              )}
              size="sm"
            >
              Closed
            </Button>
          </div>
        </div>

        {/* Mobile action button */}
        <div className="sm:hidden">
          <Button className="w-full bg-brand-500 hover:bg-brand-600">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Button>
        </div>
      </div>

      {/* Job Cards */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/30">
          <h3 className="text-xl font-medium">No jobs found</h3>
          <p className="text-muted-foreground mt-1">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={handleViewDetails}
              onViewCandidates={handleViewCandidates}
            />
          ))}
        </div>
      )}

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
