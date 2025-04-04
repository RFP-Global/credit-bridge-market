
import { ArrowUpRight, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface NotificationType {
  id: number;
  text: string;
  time: string;
}

interface NotificationsTabProps {
  notifications: NotificationType[];
}

const NotificationsTab = ({ notifications }: NotificationsTabProps) => {
  return (
    <div className="space-y-4">
      <Card className="bg-background/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-sm font-mono">NOTIFICATIONS</CardTitle>
          <CardDescription>Recent activity and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map(notification => (
              <div key={notification.id} className="border-b border-primary/10 pb-3 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm">{notification.text}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full font-mono text-xs rounded-none">
            VIEW ALL NOTIFICATIONS
            <ArrowUpRight className="ml-2 h-3 w-3" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationsTab;
