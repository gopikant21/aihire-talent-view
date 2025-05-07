import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Users,
  Calendar,
  Award,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}) => (
  <Card
    className={cn("overflow-hidden transition-all hover:shadow-md", className)}
  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div
        className={cn(
          "h-8 w-8 rounded-md flex items-center justify-center",
          trend === "up"
            ? "bg-green-100 text-green-700"
            : trend === "down"
            ? "bg-red-100 text-red-700"
            : "bg-muted"
        )}
      >
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in p-1 sm:p-4">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Here's what's happening with your recruitment pipeline today.
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Jobs"
          value="12"
          description="3 jobs added this week"
          icon={<Briefcase className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Total Candidates"
          value="342"
          description="↑ 18% from last month"
          icon={<Users className="h-4 w-4" />}
          trend="up"
        />
        <StatsCard
          title="Interviews This Week"
          value="28"
          description="12 scheduled for today"
          icon={<Calendar className="h-4 w-4" />}
          trend="neutral"
        />
        <StatsCard
          title="Positions Filled"
          value="8"
          description="↑ 2 since last month"
          icon={<Award className="h-4 w-4" />}
          trend="up"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Recent Application Activity
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Candidate applications in the last 30 days
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 text-green-700" />
                </span>
                <span className="font-medium text-green-700">+12.5%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] flex items-center justify-center">
              {/* We'll replace this with actual chart in a real implementation */}
              <div className="w-full space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">Software Engineer</p>
                      <p className="text-xs text-muted-foreground">
                        Frontend & Backend positions
                      </p>
                    </div>
                    <span className="text-sm font-semibold">48</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">Product Manager</p>
                      <p className="text-xs text-muted-foreground">
                        All levels
                      </p>
                    </div>
                    <span className="text-sm font-semibold">32</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">UX Designer</p>
                      <p className="text-xs text-muted-foreground">
                        Senior positions
                      </p>
                    </div>
                    <span className="text-sm font-semibold">24</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm font-medium">Data Analyst</p>
                      <p className="text-xs text-muted-foreground">
                        Junior & Mid-level
                      </p>
                    </div>
                    <span className="text-sm font-semibold">18</span>
                  </div>
                  <Progress value={30} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>View detailed application metrics</span>
            </div>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Pipeline Overview
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Candidates by stage
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  stage: "Applied",
                  count: 158,
                  number: 1,
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  stage: "Screening",
                  count: 84,
                  number: 2,
                  color: "bg-purple-100 text-purple-700",
                },
                {
                  stage: "Interview",
                  count: 42,
                  number: 3,
                  color: "bg-amber-100 text-amber-700",
                },
                {
                  stage: "Offer",
                  count: 16,
                  number: 4,
                  color: "bg-green-100 text-green-700",
                },
              ].map((item) => (
                <div
                  key={item.stage}
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">{item.stage}</p>
                    <p className="text-2xl font-bold">{item.count}</p>
                  </div>
                  <div
                    className={cn(
                      "h-12 w-12 rounded-full flex items-center justify-center",
                      item.color
                    )}
                  >
                    <span className="text-xl font-bold">{item.number}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-3">
            <div className="flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              <span>View complete candidate pipeline</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
