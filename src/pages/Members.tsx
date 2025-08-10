import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { MemberForm } from "@/components/forms/MemberForm";
import { DeleteConfirmation } from "@/components/forms/DeleteConfirmation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  Plus,
  Search,
  Edit,
  Trash2,
  Filter,
  UserPlus,
  UserMinus,
  Crown,
  GraduationCap,
} from "lucide-react";

interface Member {
  id: number;
  name: string;
  email: string;
  type: "regular" | "premium" | "senior" | "student";
  joinDate: string;
  status: "active" | "inactive" | "suspended";
  lastActive: string;
}

const mockMembers: Member[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    type: "premium",
    joinDate: "2024-01-15",
    status: "active",
    lastActive: "2024-08-09",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    type: "regular",
    joinDate: "2024-03-20",
    status: "active",
    lastActive: "2024-08-08",
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    type: "student",
    joinDate: "2024-02-10",
    status: "active",
    lastActive: "2024-08-07",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    type: "senior",
    joinDate: "2023-12-05",
    status: "inactive",
    lastActive: "2024-07-15",
  },
];

const memberGrowthData = [
  { month: "Jan", members: 450 },
  { month: "Feb", members: 478 },
  { month: "Mar", members: 520 },
  { month: "Apr", members: 565 },
  { month: "May", members: 580 },
  { month: "Jun", members: 600 },
];

export default function Members() {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | undefined>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const summaryData = [
    {
      title: "Total Members",
      value: members.length,
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      color: "primary" as const,
    },
    {
      title: "Active Members",
      value: members.filter(m => m.status === "active").length,
      change: "+8%",
      changeType: "positive" as const,
      icon: UserPlus,
      color: "success" as const,
    },
    {
      title: "Premium Members",
      value: members.filter(m => m.type === "premium").length,
      change: "+15%",
      changeType: "positive" as const,
      icon: Crown,
      color: "primary" as const,
    },
    {
      title: "Student Members",
      value: members.filter(m => m.type === "student").length,
      change: "+5%",
      changeType: "positive" as const,
      icon: GraduationCap,
      color: "warning" as const,
    },
  ];

  const statusColors = {
    active: "bg-success text-success-foreground",
    inactive: "bg-muted text-muted-foreground",
    suspended: "bg-destructive text-destructive-foreground",
  };

  const typeColors = {
    regular: "bg-secondary text-secondary-foreground",
    premium: "bg-primary text-primary-foreground",
    senior: "bg-warning text-warning-foreground",
    student: "bg-blue-500 text-white",
  };

  const handleAddMember = () => {
    setSelectedMember(undefined);
    setShowForm(true);
  };

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setShowForm(true);
  };

  const handleDeleteMember = (member: Member) => {
    setMemberToDelete(member);
    setShowDeleteConfirm(true);
  };

  const handleFormSubmit = (memberData: Member) => {
    if (selectedMember) {
      // Update existing member
      setMembers(prev => prev.map(m => m.id === selectedMember.id ? { ...memberData, id: selectedMember.id } : m));
    } else {
      // Add new member
      const newId = Math.max(...members.map(m => m.id)) + 1;
      setMembers(prev => [...prev, { ...memberData, id: newId }]);
    }
    setShowForm(false);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      setMembers(prev => prev.filter(m => m.id !== memberToDelete.id));
      setShowDeleteConfirm(false);
      setMemberToDelete(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Members
            </h1>
            <p className="text-muted-foreground">
              Manage community members and their subscriptions.
            </p>
          </div>
          
          <Button variant="gradient" onClick={handleAddMember}>
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {summaryData.map((card, index) => (
            <div key={card.title} style={{ animationDelay: `${index * 0.1}s` }}>
              <SummaryCard {...card} />
            </div>
          ))}
        </div>

        {/* Member Growth Chart */}
        <Card className="card-elevated p-6 animate-slide-up">
          <h3 className="text-lg font-semibold mb-6">Member Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={memberGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow-medium)",
                }}
              />
              <Area
                type="monotone"
                dataKey="members"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Search and Filters */}
        <Card className="card-elevated p-6 animate-slide-up">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </Card>

        {/* Members Table */}
        <Card className="card-elevated animate-slide-up">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">
                    {member.name}
                  </TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Badge className={typeColors[member.type]}>
                      {member.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.joinDate}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[member.status]}>
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{member.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditMember(member)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteMember(member)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* Member Form */}
        <MemberForm
          member={selectedMember}
          open={showForm}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />

        {/* Delete Confirmation */}
        <DeleteConfirmation
          open={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDelete}
          title="Delete Member"
          itemName={memberToDelete?.name}
        />
      </div>
    </DashboardLayout>
  );
}