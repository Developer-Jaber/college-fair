'use client'

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { useSession } from 'next-auth/react'
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Define the stats data structure
interface StatCard {
  title: string;
  value: string;
  description: string;
  trend: {
    value: string;
    isPositive: boolean;
    label: string;
  };
  footer: {
    message: string;
    subMessage: string;
  };
}

// Role-based stats data
const getStatsForRole = (role: string): StatCard[] => {
  switch (role) {
    case 'admin':
      return [
        {
          title: 'Total Facilities',
          value: '24',
          description: 'College facilities',
          trend: { value: '+8%', isPositive: true, label: '+8% from last month' },
          footer: { message: 'New facilities added', subMessage: '2 facilities added this month' }
        },
        {
          title: 'Active Bookings',
          value: '156',
          description: 'Current bookings',
          trend: { value: '+12.5%', isPositive: true, label: '+12.5%' },
          footer: { message: 'Trending up this month', subMessage: 'Booking activity increased' }
        },
        {
          title: 'Total Users',
          value: '1,234',
          description: 'Registered users',
          trend: { value: '+5%', isPositive: true, label: '+5%' },
          footer: { message: 'User growth steady', subMessage: 'New registrations this week' }
        },
        {
          title: 'Pending Approvals',
          value: '8',
          description: 'Awaiting review',
          trend: { value: '-20%', isPositive: false, label: '-20%' },
          footer: { message: 'Approval queue reduced', subMessage: 'Faster processing time' }
        }
      ];
    
    case 'staff':
      return [
        {
          title: 'Managed Facilities',
          value: '8',
          description: 'Under your management',
          trend: { value: '+2%', isPositive: true, label: '+2%' },
          footer: { message: 'All facilities operational', subMessage: 'No maintenance issues' }
        },
        {
          title: "Today's Bookings",
          value: '12',
          description: 'Scheduled today',
          trend: { value: '+15%', isPositive: true, label: '+15%' },
          footer: { message: 'High activity today', subMessage: 'Peak booking hours: 10-14' }
        },
        {
          title: 'Pending Reviews',
          value: '3',
          description: 'Awaiting your approval',
          trend: { value: '-10%', isPositive: false, label: '-10%' },
          footer: { message: 'Quick review needed', subMessage: 'Average review time: 2 hours' }
        }
      ];
    
    case 'faculty':
      return [
        {
          title: 'My Bookings',
          value: '5',
          description: 'Active bookings',
          trend: { value: '+2', isPositive: true, label: '+2 new bookings' },
          footer: { message: 'Upcoming classes scheduled', subMessage: 'Next booking: Tomorrow 9 AM' }
        },
        {
          title: 'Available Facilities',
          value: '18',
          description: 'Ready to book',
          trend: { value: '100%', isPositive: true, label: 'All accessible' },
          footer: { message: 'Great availability', subMessage: 'Book 24/7 through portal' }
        },
        {
          title: 'Upcoming Events',
          value: '2',
          description: 'Next 7 days',
          trend: { value: '+1', isPositive: true, label: '+1 this week' },
          footer: { message: 'Conference room booked', subMessage: 'Department meeting scheduled' }
        }
      ];
    
    case 'student':
      return [
        {
          title: 'My Bookings',
          value: '3',
          description: 'Active bookings',
          trend: { value: '+1', isPositive: true, label: '+1 new booking' },
          footer: { message: 'Study sessions planned', subMessage: 'Library room reserved' }
        },
        {
          title: 'Available Facilities',
          value: '15',
          description: 'Student accessible',
          trend: { value: '85%', isPositive: true, label: '85% available' },
          footer: { message: 'Good availability', subMessage: 'Peak hours: 14-18' }
        },
        {
          title: 'Study Groups',
          value: '4',
          description: 'Active groups',
          trend: { value: '+2', isPositive: true, label: '+2 new groups' },
          footer: { message: 'Join study sessions', subMessage: 'Math study group tomorrow' }
        }
      ];
    
    default:
      return [];
  }
};

export function StatsCards() {
  const { data: session } = useSession();
  
  // Get role-specific stats
  const stats = session?.user?.role ? getStatsForRole(session.user.role) : [];

  // Show loading state if no session yet
  if (!session) {
    return (
      <div className="gap-4 grid grid-cols-1 @5xl/main:grid-cols-4 @xl/main:grid-cols-2 px-4 lg:px-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="@container/card animate-pulse">
            <CardHeader>
              <div className="bg-gray-200 rounded w-1/2 h-4"></div>
              <div className="bg-gray-200 rounded w-3/4 h-8"></div>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="gap-4 grid grid-cols-1 @5xl/main:grid-cols-4 @xl/main:grid-cols-2 dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs px-4 lg:px-6">
      {stats.map((stat, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{stat.description}</CardDescription>
            <CardTitle className="font-semibold tabular-nums text-2xl @[250px]/card:text-3xl">
              {stat.value}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {stat.trend.isPositive ? <IconTrendingUp /> : <IconTrendingDown />}
                {stat.trend.value}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="flex gap-2 font-medium line-clamp-1">
              {stat.footer.message}{' '}
              {stat.trend.isPositive ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">
              {stat.footer.subMessage}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}