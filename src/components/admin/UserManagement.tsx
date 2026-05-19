'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Search, UserX, Mail, UserCheck } from "lucide-react";

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  user_type: string;
  role: string;
  created_at: string;
  city: string | null;
  state: string | null;
}

export const UserManagement = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
 
  const { makeUserAdmin } = useAuth();

  useEffect(() => {
    fetchUsers();

    // Set up real-time subscription for user updates
    const channel = supabase
      .channel('user-management-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'profiles'
        },
        (payload) => {
          console.log('Profile change detected:', payload);
          fetchUsers(); // Refresh the users list
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      //setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error( "Error",{
        description: "Failed to fetch users",
        
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    if (!searchTerm) {
      setFilteredUsers(users);
      return;
    }

    const filtered = users.filter(user => {
      const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
      const location = `${user.city || ''} ${user.state || ''}`.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      
      return fullName.includes(searchLower) || 
             user.user_type.toLowerCase().includes(searchLower) ||
             location.includes(searchLower);
    });
    
    setFilteredUsers(filtered);
  };

  const getUserTypeVariant = (userType: string) => {
    switch (userType) {
      case 'donor': return 'default';
      case 'recipient': return 'secondary';
      default: return 'outline';
    }
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'admin': return 'destructive';
      case 'donor': return 'default';
      case 'recipient': return 'secondary';
      default: return 'outline';
    }
  };

  const handleMakeAdmin = async (userId: string) => {
    try {
      const { error } = await makeUserAdmin(userId);
      if (error) throw error;
      
      toast.success( "Success",{
        description: "User has been promoted to admin",
      });
      
      // Refresh the users list
      fetchUsers();
    } catch (error) {
      console.error('Error making user admin:', error);
      toast.error("Error",{
        description: "Failed to promote user to admin"
        
      });
    }
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage and monitor all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-6">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name, type, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>User Type</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.first_name || user.last_name 
                        ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
                        : 'No name provided'
                      }
                    </TableCell>
                    <TableCell>
                      <Badge variant={getUserTypeVariant(user.user_type)}>
                        {user.user_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getRoleVariant(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.city && user.state 
                        ? `${user.city}, ${user.state}`
                        : user.city || user.state || 'Not specified'
                      }
                    </TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Mail className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                        {user.role !== 'admin' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleMakeAdmin(user.id)}
                            className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            <UserCheck className="h-3 w-3 mr-1" />
                            Make Admin
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <UserX className="h-3 w-3 mr-1" />
                          Suspend
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? 'No users found matching your search.' : 'No users found.'}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};