import { CardsStats } from "@/components/activity-goal";
import RecentActivity from "@/components/recent-activity";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthenticatedUser } from "@/utils/authenticatedUser";

export default async function Dashboard() {
  const dbUser = await getAuthenticatedUser();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
            <CardTitle className="text-sm font-normal">Welcome!</CardTitle>
          </CardHeader>
          <CardContent className="pb-0">
            <div className="text-2xl font-bold">
              {(dbUser.name && dbUser.name) || "User"}
            </div>
            <p className="text-xs text-primary">{dbUser.email}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Welcome to your dashboard. Here you can view your recent activity
              and update your profile.
            </p>
          </CardContent>
          <CardFooter className="mt-2 w-full">
            <Button>Edit Profile</Button>
          </CardFooter>
        </Card>
        <CardsStats />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
        <RecentActivity />
      </div>
    </div>
  );
}
