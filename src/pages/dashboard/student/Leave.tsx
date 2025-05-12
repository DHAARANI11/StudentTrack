
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Clock, Calendar, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface LeaveRequest {
  id: string;
  type: 'sick' | 'personal' | 'family' | 'other';
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  responseAt?: string;
  responseBy?: string;
  responseNote?: string;
}

const leaveFormSchema = z.object({
  type: z.enum(['sick', 'personal', 'family', 'other'], {
    required_error: "Please select a leave type",
  }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});

type LeaveFormValues = z.infer<typeof leaveFormSchema>;

export default function StudentLeave() {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      type: undefined,
      startDate: '',
      endDate: '',
      reason: '',
    },
  });

  useEffect(() => {
    // Mock API call to fetch leave requests
    const fetchLeaveRequests = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Mock data
        const mockLeaveRequests: LeaveRequest[] = [
          {
            id: "1",
            type: "sick",
            startDate: "2025-04-10",
            endDate: "2025-04-12",
            reason: "I have a doctor's appointment and need to rest afterward.",
            status: "approved",
            submittedAt: "2025-04-05T10:30:00",
            responseAt: "2025-04-06T14:15:00",
            responseBy: "Dr. Jane Smith",
            responseNote: "Approved based on medical documentation provided."
          },
          {
            id: "2",
            type: "family",
            startDate: "2025-05-20",
            endDate: "2025-05-25",
            reason: "Family emergency requiring travel out of state.",
            status: "pending",
            submittedAt: "2025-05-15T08:45:00"
          },
          {
            id: "3",
            type: "personal",
            startDate: "2025-03-05",
            endDate: "2025-03-07",
            reason: "Need to attend a relative's wedding.",
            status: "rejected",
            submittedAt: "2025-02-25T16:20:00",
            responseAt: "2025-02-28T09:10:00",
            responseBy: "Prof. Michael Johnson",
            responseNote: "Denied due to upcoming assessment during this period."
          }
        ];
        
        setLeaveRequests(mockLeaveRequests);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load leave requests",
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveRequests();
  }, [toast]);

  const onSubmit = async (values: LeaveFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new leave request - Fix: Ensure all required properties are non-optional
      const newLeaveRequest: LeaveRequest = {
        id: Date.now().toString(),
        type: values.type, // Explicitly assign from form values
        startDate: values.startDate,
        endDate: values.endDate,
        reason: values.reason,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      
      // Update state
      setLeaveRequests(prev => [newLeaveRequest, ...prev]);
      
      toast({
        title: "Leave request submitted",
        description: "Your leave request has been submitted successfully",
      });
      
      // Reset form and close dialog
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to submit leave request",
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: LeaveRequest['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">
            <Check className="h-3 w-3" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800">
            <X className="h-3 w-3" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3" />
            Pending
          </span>
        );
    }
  };

  const getLeaveTypeLabel = (type: LeaveRequest['type']) => {
    switch (type) {
      case 'sick':
        return 'Medical Leave';
      case 'personal':
        return 'Personal Leave';
      case 'family':
        return 'Family Emergency';
      default:
        return 'Other';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leave Requests</h2>
          <p className="text-muted-foreground">
            Request and track your leave applications.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>New Leave Request</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Apply for Leave</DialogTitle>
              <DialogDescription>
                Fill in the details to submit a new leave request.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Leave Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select leave type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sick">Medical Leave</SelectItem>
                          <SelectItem value="personal">Personal Leave</SelectItem>
                          <SelectItem value="family">Family Emergency</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please provide a detailed reason for your leave request..." 
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : leaveRequests.length > 0 ? (
        <div className="space-y-4">
          {leaveRequests.map((request) => (
            <Card key={request.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{getLeaveTypeLabel(request.type)}</CardTitle>
                  {getStatusBadge(request.status)}
                </div>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {new Date(request.startDate).toLocaleDateString()} to {new Date(request.endDate).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium">Reason:</h4>
                    <p className="text-sm text-muted-foreground">{request.reason}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Submitted on: {new Date(request.submittedAt).toLocaleDateString()} at {new Date(request.submittedAt).toLocaleTimeString()}
                  </div>
                </div>
              </CardContent>
              {request.status !== 'pending' && (
                <CardFooter className="bg-muted/40 pt-2 flex flex-col items-start border-t">
                  <div className="w-full">
                    <div className="text-xs flex justify-between">
                      <span>Response by: {request.responseBy}</span>
                      <span>
                        {request.responseAt && new Date(request.responseAt).toLocaleDateString()}
                      </span>
                    </div>
                    {request.responseNote && (
                      <p className="text-xs mt-1">{request.responseNote}</p>
                    )}
                  </div>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No leave requests found</p>
        </div>
      )}
    </div>
  );
}
