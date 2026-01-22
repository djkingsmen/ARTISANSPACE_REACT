import { useState, useEffect } from "react";
import api from "../../lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Plus, History } from "lucide-react";

interface Ticket {
  _id: string;
  subject: string;
  category: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}

export default function SupportTicketPage() {
  const [activeTab, setActiveTab] = useState<"create" | "previous">("create");
  const [isCreating, setIsCreating] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [previousTickets, setPreviousTickets] = useState<Ticket[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    fetchPreviousTickets();
  }, []);

  const fetchPreviousTickets = async () => {
    try {
      setLoadingTickets(true);
      const response = await api.get("/tickets/user/my-tickets");
      if (response.data.success) {
        setPreviousTickets(response.data.tickets || []);
      }
    } catch (error) {
      console.error("Error fetching previous tickets:", error);
    } finally {
      setLoadingTickets(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      const submitData = {
        subject: formData.subject,
        category: formData.category,
        description: formData.description,
      };
      const response = await api.post("/tickets", submitData);
      if (response.data.success) {
        setSubmitted(true);
        setFormData({
          subject: "",
          category: "",
          description: "",
        });
        setTimeout(() => setSubmitted(false), 3000);
        fetchPreviousTickets();
      }
    } catch (error: any) {
      console.error("Error creating ticket:", error);
      alert(error.response?.data?.message || "Error creating ticket. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800 border-red-200";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4 animate-spin" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const pendingTickets = previousTickets.filter(t => t.status === "open" || t.status === "in-progress");
  const resolvedTickets = previousTickets.filter(t => t.status === "resolved" || t.status === "closed");

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-amber-300">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
              activeTab === "create"
                ? "border-b-2 border-amber-950 text-amber-950"
                : "text-amber-700 hover:text-amber-900"
            }`}
          >
            <Plus className="w-5 h-5" />
            Create Ticket
          </button>
          <button
            onClick={() => setActiveTab("previous")}
            className={`flex items-center gap-2 px-6 py-3 font-semibold transition-colors ${
              activeTab === "previous"
                ? "border-b-2 border-amber-950 text-amber-950"
                : "text-amber-700 hover:text-amber-900"
            }`}
          >
            <History className="w-5 h-5" />
            Previous Tickets
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Create Ticket Tab */}
          {activeTab === "create" && (
            <Card className="border-2 border-amber-200 shadow-lg">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-amber-950 mb-6">Create New Support Ticket</h2>
                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={24} />
                    <div>
                      <h3 className="font-semibold text-green-800">Success!</h3>
                      <p className="text-green-700">Your ticket has been submitted. Our team will review it shortly.</p>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handleCreateTicket} className="space-y-6">
                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Brief description of your issue"
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Category *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select a category</option>
                      <option value="order">Order Issue</option>
                      <option value="product">Product Quality</option>
                      <option value="delivery">Delivery Problem</option>
                      <option value="payment">Payment Issue</option>
                      <option value="return">Return/Refund</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Please provide detailed information about your issue..."
                      rows={5}
                      className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="w-full bg-amber-950 hover:bg-amber-900 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    {isCreating ? "Submitting..." : "Submit Ticket"}
                  </button>
                </form>

                <p className="mt-4 text-sm text-amber-700 text-center">
                  Your ticket will be reviewed by our support team and you'll receive updates about its status.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Previous Tickets Tab */}
          {activeTab === "previous" && (
            <>
              {loadingTickets ? (
                <div className="text-center py-8">
                  <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-amber-600" />
                  <p className="text-amber-900 font-semibold">Loading your tickets...</p>
                </div>
              ) : previousTickets.length === 0 ? (
                <Card className="border-2 border-amber-200 border-dashed">
                  <CardContent className="py-8 text-center">
                    <p className="text-amber-700">No tickets yet. Create your first support ticket to get started.</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Pending Tickets */}
                  {pendingTickets.length > 0 && (
                    <Card className="border-2 border-red-200 shadow-lg">
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          Pending Tickets ({pendingTickets.length})
                        </h2>
                        <div className="space-y-4">
                          {pendingTickets.map((ticket) => (
                            <Card key={ticket._id} className="border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-transparent">
                              <CardContent className="pt-6">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                      <h3 className="font-semibold text-amber-950">{ticket.subject}</h3>
                                      <Badge className={`flex items-center gap-1 ${getStatusColor(ticket.status)} border`}>
                                        {getStatusIcon(ticket.status)}
                                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                                      <div>
                                        <p className="text-gray-600">Category</p>
                                        <p className="font-medium text-amber-900 capitalize">{ticket.category}</p>
                                      </div>
                                      <div>
                                        <p className="text-gray-600">Created</p>
                                        <p className="font-medium text-amber-900">
                                          {new Date(ticket.createdAt).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-700 line-clamp-2">{ticket.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Resolved Tickets */}
                  {resolvedTickets.length > 0 && (
                    <Card className="border-2 border-green-200 shadow-lg">
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Resolved Tickets ({resolvedTickets.length})
                        </h2>
                        <div className="space-y-4">
                          {resolvedTickets.map((ticket) => (
                            <Card key={ticket._id} className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-transparent opacity-75">
                              <CardContent className="pt-6">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-3">
                                      <h3 className="font-semibold text-amber-950">{ticket.subject}</h3>
                                      <Badge className={`flex items-center gap-1 ${getStatusColor(ticket.status)} border`}>
                                        {getStatusIcon(ticket.status)}
                                        {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                      </Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                                      <div>
                                        <p className="text-gray-600">Category</p>
                                        <p className="font-medium text-amber-900 capitalize">{ticket.category}</p>
                                      </div>
                                      <div>
                                        <p className="text-gray-600">Resolved</p>
                                        <p className="font-medium text-amber-900">
                                          {new Date(ticket.updatedAt).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-700 line-clamp-2">{ticket.description}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
