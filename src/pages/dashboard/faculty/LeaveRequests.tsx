import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Mock leave requests data
const leaveRequestsData = [
  {
    id: "LR-001",
    student: {
      id: "S001",
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80",
      class: "Mathematics 101 - A"
    },
    type: "sick",
    startDate: "2025-05-15",
    endDate: "2025-05-17",
    reason: "I'm suffering from severe flu and fever. Doctor advised 3 days rest.",
    submittedAt: "2025-05-10T09:30:00",
    status: "pending",
    attachments: [
      { name: "medical_certificate.pdf", url: "#" }
    ]
  },
  {
    id: "LR-002",
    student: {
      id: "S015",
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80",
      class: "Engineering Mathematics - A"
    },
    type: "personal",
    startDate: "2025-05-20",
    endDate: "2025-05-21",
    reason: "Family wedding ceremony, need to travel out of town.",
    submittedAt: "2025-05-09T14:15:00",
    status: "pending",
    attachments: []
  },
  {
    id: "LR-003",
    student: {
      id: "S042",
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80",
      class: "Mathematics 101 - B"
    },
    type: "family",
    startDate: "2025-05-18",
    endDate: "2025-05-19",
    reason: "Family emergency, need to visit hometown.",
    submittedAt: "2025-05-08T11:20:00",
    status: "approved",
    attachments: [],
    respondedAt: "2025-05-09T10:15:00",
    comments: "Approved. Please catch up on missed work."
  },
  {
    id: "LR-004",
    student: {
      id: "S023",
      name: "Sophia Lee",
      avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80",
      class: "Mathematics 101 - A"
    },
    type: "other",
    startDate: "2025-05-12",
    endDate: "2025-05-14",
    reason: "Participating in national debate competition representing our college.",
    submittedAt: "2025-05-05T16:40:00",
    status: "approved",
    attachments: [
      { name: "invitation_letter.pdf", url: "#" }
    ],
    respondedAt: "2025-05-06T09:30:00",
    comments: "Approved. Good luck with the competition!"
  },
  {
    id: "LR-005",
    student: {
      id: "S037",
      name: "Daniel Brown",
      avatar: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=150&h=150&q=80",
      class: "Engineering Mathematics - A"
    },
    type: "sick",
    startDate: "2025-05-08",
    endDate: "2025-05-10",
    reason: "Recovering from minor surgery.",
    submittedAt: "2025-05-06T08:25:00",
    status: "rejected",
    attachments: [],
    respondedAt: "2025-05-07T11:45:00",
    comments: "Insufficient information provided. Please submit medical certificate."
  },
];

export default function LeaveRequests() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [responseComment, setResponseComment] = useState("");

  // Filter leave requests based on search term and status
  const filteredRequests = leaveRequestsData.filter(request => {
    const matchesSearch = 
      request.student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      request.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === null) return matchesSearch;
    return matchesSearch && request.status === statusFilter;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const viewRequestDetails = (request: any) => {
    setSelectedRequest(request);
    setDetailsDialogOpen(true);
    setResponseComment(request.comments || "");
  };

  const handleResponse = (approved: boolean) => {
    if (!selectedRequest) return;
    
    // In a real app, you would submit this to an API
    const action = approved ? "approved" : "rejected";
    toast({
      title: `Leave Request ${action}`,
      description: `${selectedRequest.student.name}'s leave request has been ${action}.`,
    });
    
    setDetailsDialogOpen(false);
    setResponseComment("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leave Requests</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <Button 
            variant={statusFilter === null ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === "pending" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </Button>
          <Button 
            variant={statusFilter === "approved" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter("approved")}
          >
            Approved
          </Button>
          <Button 
            variant={statusFilter === "rejected" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter("rejected")}
          >
            Rejected
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leaveRequestsData.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leaveRequestsData.filter(r => r.status === "pending").length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Responded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {leaveRequestsData.filter(r => r.status !== "pending").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Requests Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Manage student leave applications</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredRequests.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={request.student.avatar} />
                            <AvatarFallback>
                              {request.student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{request.student.name}</div>
                            <div className="text-xs text-muted-foreground">{request.student.class}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">{request.type}</TableCell>
                      <TableCell>
                        {formatDate(request.startDate)} - {formatDate(request.endDate)}
                      </TableCell>
                      <TableCell>{formatDate(request.submittedAt)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            request.status === "approved"
                              ? "secondary"
                              : request.status === "rejected"
                              ? "destructive"
                              : "outline"
                          }
                          className={request.status === "pending" ? "bg-warning/10 text-warning" : ""}
                        >
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewRequestDetails(request)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-10">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-4 text-lg font-medium">No leave requests found</h3>
              <p className="text-muted-foreground mt-2">
                There are no leave requests matching your current filters.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Leave Request Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Leave Request Details</DialogTitle>
            <DialogDescription>
              {selectedRequest && `Request ID: ${selectedRequest.id}`}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Student Information */}
              <div className="flex items-start gap-4 pb-4 border-b">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedRequest.student.avatar} />
                  <AvatarFallback>
                    {selectedRequest.student.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedRequest.student.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Student ID: {selectedRequest.student.id} • Class: {selectedRequest.student.class}
                  </p>
                </div>
                <div className="ml-auto">
                  <Badge
                    variant={
                      selectedRequest.status === "approved"
                        ? "secondary"
                        : selectedRequest.status === "rejected"
                        ? "destructive"
                        : "outline"
                    }
                    className={selectedRequest.status === "pending" ? "bg-warning/10 text-warning" : ""}
                  >
                    {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Leave Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Leave Type</h4>
                  <p className="capitalize">{selectedRequest.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Duration</h4>
                  <p>{formatDate(selectedRequest.startDate)} - {formatDate(selectedRequest.endDate)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Submitted On</h4>
                  <p>{formatDateTime(selectedRequest.submittedAt)}</p>
                </div>
                <div>
                  {selectedRequest.respondedAt && (
                    <>
                      <h4 className="text-sm font-medium mb-1">Response Date</h4>
                      <p>{formatDateTime(selectedRequest.respondedAt)}</p>
                    </>
                  )}
                </div>
              </div>

              {/* Reason */}
              <div>
                <h4 className="text-sm font-medium mb-1">Reason for Leave</h4>
                <div className="p-3 bg-muted/50 rounded-md">
                  {selectedRequest.reason}
                </div>
              </div>

              {/* Attachments if any */}
              {selectedRequest.attachments.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Attachments</h4>
                  <div className="flex gap-2">
                    {selectedRequest.attachments.map((attachment: {name: string, url: string}, index: number) => (
                      <Button key={index} variant="outline" size="sm" asChild>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                          {attachment.name}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Response Section */}
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Response/Comments</h4>
                <Textarea
                  placeholder="Enter your response or comments here..."
                  value={responseComment}
                  onChange={(e) => setResponseComment(e.target.value)}
                  rows={3}
                  disabled={selectedRequest.status !== "pending"}
                />
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between sm:justify-end">
            {selectedRequest?.status === "pending" ? (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => handleResponse(false)}
                  className="border-destructive text-destructive hover:bg-destructive/10"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button 
                  onClick={() => handleResponse(true)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </>
            ) : (
              <Button onClick={() => setDetailsDialogOpen(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
