
import EnterpriseLayout from "@/components/layout/EnterpriseLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, Clock, Shield, Plus, FileText, UserPlus, Settings } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "CEO",
      email: "alex@terraforge.com",
      phone: "(555) 123-4567",
      avatar: "AJ",
      status: "active",
      lastActive: "Just now",
      permissions: "Admin"
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "CFO",
      email: "maria@terraforge.com",
      phone: "(555) 234-5678",
      avatar: "MR",
      status: "active",
      lastActive: "1 hour ago",
      permissions: "Admin"
    },
    {
      id: 3,
      name: "David Chen",
      role: "Project Manager",
      email: "david@terraforge.com",
      phone: "(555) 345-6789",
      avatar: "DC",
      status: "active",
      lastActive: "3 hours ago",
      permissions: "Editor"
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Financial Analyst",
      email: "sarah@terraforge.com",
      phone: "(555) 456-7890",
      avatar: "SW",
      status: "inactive",
      lastActive: "2 days ago",
      permissions: "Viewer"
    }
  ];

  const pendingInvites = [
    {
      id: 1,
      email: "james@example.com",
      role: "Project Manager",
      sentDate: "Apr 2, 2025",
      permissions: "Editor"
    },
    {
      id: 2,
      email: "lisa@example.com",
      role: "Financial Analyst",
      sentDate: "Apr 1, 2025",
      permissions: "Viewer"
    }
  ];

  return (
    <EnterpriseLayout
      title="Team Management"
      description="Manage your team members and their permissions."
    >
      <div className="container mx-auto px-6 py-8">
        <div className="border-b border-primary/10 pb-4 mb-6">
          <h1 className="text-2xl font-mono">Team Management</h1>
          <p className="text-sm text-muted-foreground">Manage your team members, roles, and access permissions.</p>
        </div>

        <Tabs defaultValue="members" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="bg-background/50 border border-primary/20">
              <TabsTrigger value="members" className="font-mono text-xs">TEAM MEMBERS</TabsTrigger>
              <TabsTrigger value="invites" className="font-mono text-xs">PENDING INVITES</TabsTrigger>
              <TabsTrigger value="roles" className="font-mono text-xs">ROLES & PERMISSIONS</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="font-mono text-xs rounded-none">
              <UserPlus className="h-3.5 w-3.5 mr-2" />
              INVITE TEAM MEMBER
            </Button>
          </div>
          
          <TabsContent value="members">
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <Card key={member.id} className={`border-primary/20 bg-background/50 ${member.status === 'active' ? 'hover:bg-primary/5' : 'opacity-70'} transition-colors`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-sm font-mono mr-4">
                          {member.avatar}
                        </div>
                        <div>
                          <h3 className="text-lg font-mono mb-1">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="hidden md:flex items-center gap-6">
                        <div>
                          <div className="flex items-center text-sm mb-1">
                            <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            {member.email}
                          </div>
                          <div className="flex items-center text-sm">
                            <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            {member.phone}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-sm mb-1">
                            <Clock className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Last active:</span>
                            <span className="ml-1">{member.lastActive}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Shield className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">Permissions:</span>
                            <span className="ml-1 font-mono">{member.permissions}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="font-mono text-xs rounded-none">
                          <Settings className="h-3.5 w-3.5 mr-2" />
                          MANAGE
                        </Button>
                      </div>
                      <div className="md:hidden">
                        <Button variant="outline" size="sm" className="font-mono text-xs rounded-none">
                          <Settings className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 md:hidden">
                      <div className="grid grid-cols-1 gap-2">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          {member.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          {member.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Clock className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">Last active:</span>
                          <span className="ml-1">{member.lastActive}</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <Shield className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">Permissions:</span>
                          <span className="ml-1 font-mono">{member.permissions}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="invites">
            <div className="space-y-4">
              {pendingInvites.length > 0 ? (
                pendingInvites.map((invite) => (
                  <Card key={invite.id} className="border-primary/20 bg-background/50">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-muted w-12 h-12 rounded-full flex items-center justify-center text-sm font-mono mr-4">
                            <User className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="text-lg font-mono mb-1">{invite.email}</h3>
                            <p className="text-sm text-muted-foreground">{invite.role}</p>
                          </div>
                        </div>
                        <div className="hidden md:block">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Invited:</span>
                            <span className="ml-1">{invite.sentDate}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Permissions:</span>
                            <span className="ml-1 font-mono">{invite.permissions}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="font-mono text-xs rounded-none">
                            RESEND
                          </Button>
                          <Button variant="outline" size="sm" className="font-mono text-xs rounded-none text-destructive hover:text-destructive">
                            CANCEL
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 md:hidden">
                        <div className="grid grid-cols-1 gap-2">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Invited:</span>
                            <span className="ml-1">{invite.sentDate}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-muted-foreground">Permissions:</span>
                            <span className="ml-1 font-mono">{invite.permissions}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-primary/20 bg-background/50">
                  <CardContent className="flex flex-col items-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Pending Invites</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-4">
                      There are no pending team invitations at this time.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="font-mono text-xs rounded-none"
                    >
                      <Plus className="h-3.5 w-3.5 mr-2" />
                      INVITE TEAM MEMBER
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="roles">
            <Card className="border-primary/20 bg-background/50">
              <CardHeader>
                <CardTitle className="text-lg font-mono">Roles & Permissions</CardTitle>
                <CardDescription>Define access levels for your team members.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-b border-primary/10 pb-4">
                      <h3 className="font-mono text-sm mb-2">ADMIN</h3>
                      <p className="text-sm text-muted-foreground">
                        Full access to all features, including team management, financial data, and project creation.
                      </p>
                    </div>
                    <div className="border-b border-primary/10 pb-4">
                      <h3 className="font-mono text-sm mb-2">EDITOR</h3>
                      <p className="text-sm text-muted-foreground">
                        Can create and edit projects, upload documents, and view financial data. Cannot manage team members.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-mono text-sm mb-2">VIEWER</h3>
                      <p className="text-sm text-muted-foreground">
                        Read-only access to projects and limited financial data. Cannot make changes or upload documents.
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="font-mono text-xs rounded-none">
                    <Settings className="h-3.5 w-3.5 mr-2" />
                    CUSTOMIZE ROLES
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EnterpriseLayout>
  );
};

export default Team;
