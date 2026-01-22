import React, { useState, useEffect } from "react";
import api from "../lib/axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock, Loader } from "lucide-react";

interface Ticket {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  subject: string;
  category: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}

export default function SupportTicketPage(): React.ReactElement {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [resolving, setResolving] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await api.get("/tickets");
      if (response.data.success) {
        setTickets(response.data.tickets || []);
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolveTicket = async () => {
    if (!selectedTicket) return;

    try {
      setResolving(true);
      const response = await api.patch(`/tickets/${selectedTicket._id}/status`, {
        status: "resolved",
      });

      if (response.data.success) {
        setTickets(
          tickets.map((t) =>
            t._id === selectedTicket._id ? { ...t, status: "resolved" } : t
          )
        );
        setSelectedTicket(null);
      }
    } catch (error) {
      console.error("Error resolving ticket:", error);
      alert("Failed to resolve ticket");
    } finally {
      setResolving(false);
    }
  };

  const handleMarkInProgress = async () => {
    if (!selectedTicket) return;

    try {
      setResolving(true);
      const response = await api.patch(`/tickets/${selectedTicket._id}/status`, {
        status: "in-progress",
      });

      if (response.data.success) {
        setTickets(
          tickets.map((t) =>
            t._id === selectedTicket._id ? { ...t, status: "in-progress" } : t
          )
        );
        setSelectedTicket(null);
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Failed to update ticket");
    } finally {
      setResolving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      case "closed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Loader className="w-4 h-4" />;
    }
  };

  const openTickets = tickets.filter(
    (t) => t.status === "open" || t.status === "in-progress"
  );
  const resolvedTickets = tickets.filter((t) => t.status === "resolved" || t.status === "closed");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-amber-600" />
          <p className="text-amber-900 font-semibold">Loading support tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg shadow-md p-6 border border-amber-200">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-amber-900 mb-2">Support Tickets</h1>
        <p className="text-gray-600">
          Manage customer support tickets and resolve issues
        </p>
      </div>

      <div className="space-y-8">
        {/* Open Tickets Section */}
        <div>
          <h2 className="text-2xl font-semibold text-amber-900 mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            Open Tickets ({openTickets.length})
          </h2>

          {openTickets.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="py-8 text-center text-gray-500">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No open tickets. Great work!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {openTickets.map((ticket) => (
                <Card key={ticket._id} className="border-l-4 border-l-red-500">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-amber-900">
                            {ticket.subject}
                          </h3>
                          <Badge className={`${getStatusColor(ticket.status)} flex items-center gap-1`}>
                            {getStatusIcon(ticket.status)}
                            {ticket.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <p className="text-gray-600">Category</p>
                            <p className="font-medium text-amber-900 capitalize">{ticket.category}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Customer</p>
                            <p className="font-medium text-amber-900">{ticket.userId.name}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Email</p>
                            <p className="font-medium text-amber-900">{ticket.userId.email}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Created</p>
                            <p className="font-medium text-amber-900">
                              {new Date(ticket.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <p className="text-gray-600 text-sm mb-1">Description</p>
                          <p className="text-amber-900 text-sm">{ticket.description}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="bg-amber-950 hover:bg-amber-900 text-white px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                      >
                        View & Resolve
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Resolved Tickets Section */}
        <div>
          <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" />
            Resolved Tickets ({resolvedTickets.length})
          </h2>

          {resolvedTickets.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-300">
              <CardContent className="py-8 text-center text-gray-500">
                <p>No resolved tickets yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {resolvedTickets.map((ticket) => (
                <Card key={ticket._id} className="border-l-4 border-l-green-500 opacity-75">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg text-amber-900">
                            {ticket.subject}
                          </h3>
                          <Badge className={`${getStatusColor(ticket.status)} flex items-center gap-1`}>
                            {getStatusIcon(ticket.status)}
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <p className="text-gray-600">Category</p>
                            <p className="font-medium text-amber-900 capitalize">{ticket.category}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Customer</p>
                            <p className="font-medium text-amber-900">{ticket.userId.name}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Resolved</p>
                            <p className="font-medium text-amber-900">
                              {new Date(ticket.updatedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-semibold text-amber-900">
                  {selectedTicket.subject}
                </h2>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-500 text-sm mb-4">
                Ticket #{selectedTicket._id.substring(0, 8)}
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer Name</p>
                    <p className="font-semibold text-amber-900">
                      {selectedTicket.userId.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Customer Email</p>
                    <p className="font-semibold text-amber-900">
                      {selectedTicket.userId.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-amber-900 capitalize">
                      {selectedTicket.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className={`${getStatusColor(selectedTicket.status)} flex items-center gap-1`}>
                      {getStatusIcon(selectedTicket.status)}
                      {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-amber-900 text-sm whitespace-pre-wrap">
                      {selectedTicket.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p>Created</p>
                    <p className="font-medium text-amber-900">
                      {new Date(selectedTicket.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p>Last Updated</p>
                    <p className="font-medium text-amber-900">
                      {new Date(selectedTicket.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-6 justify-end">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                {selectedTicket.status === "open" && (
                  <button
                    onClick={handleMarkInProgress}
                    disabled={resolving}
                    className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    {resolving ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4" />
                        Mark as In-Progress
                      </>
                    )}
                  </button>
                )}
                {selectedTicket.status !== "resolved" && (
                  <button
                    onClick={handleResolveTicket}
                    disabled={resolving}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    {resolving ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Resolving...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Mark as Resolved
                      </>
                    )}
                  </button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
