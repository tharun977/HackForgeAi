import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: {
        name: "You",
        avatar: "YO",
      },
      action: "created a new project",
      project: "E-commerce Platform",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Alex",
        avatar: "AJ",
      },
      action: "commented on",
      project: "Task Management App",
      time: "5 hours ago",
    },
    {
      id: 3,
      user: {
        name: "Sarah",
        avatar: "SC",
      },
      action: "joined your project",
      project: "E-commerce Platform",
      time: "1 day ago",
    },
    {
      id: 4,
      user: {
        name: "You",
        avatar: "YO",
      },
      action: "deployed",
      project: "Personal Blog",
      time: "2 days ago",
    },
    {
      id: 5,
      user: {
        name: "Michael",
        avatar: "MR",
      },
      action: "pushed code to",
      project: "Task Management App",
      time: "3 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 rounded-lg border p-3">
              <Avatar>
                <AvatarFallback>{activity.user.avatar}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
                  <span className="font-semibold">{activity.project}</span>
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
