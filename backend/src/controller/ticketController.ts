import type { Request, Response } from "express";
import {
  addTicket,
  getTickets,
  removeTicket,
  updateTicketStatus,
  getUserTickets,
} from "../services/ticketServices.js";
import z from "zod";

const submitTicketSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
});

const updateStatusSchema = z.object({
  status: z.enum(["open", "in-progress", "resolved", "closed"]),
});

export const getSupportTickets = async (req: Request, res: Response) => {
  try {
    let tickets = await getTickets();
    res.json({ success: true, tickets });
  } catch (error) {
    throw new Error("Error fetching tickets: " + (error as Error).message);
  }
};

export const submitSuppotTicket = async (req: Request, res: Response) => {
  try {
    const validated = submitTicketSchema.parse(req.body);
    const { subject, category, description } = validated;

    const newTicket = await addTicket(
      req.user.id,
      subject,
      category,
      description
    );
    res.json({
      success: true,
      message: "Ticket submitted successfully!",
      ticket: newTicket,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues?.[0]?.message || "Validation error",
      });
    }
    throw new Error("Error submitting ticket: " + (error as Error).message);
  }
};

export const updateTicketStatusController = async (
  req: Request,
  res: Response
) => {
  try {
    const { ticketId } = req.params;
    if (!ticketId) {
      return res.status(400).json({
        success: false,
        message: "Ticket ID is required",
      });
    }

    const validated = updateStatusSchema.parse(req.body);
    const { status } = validated;

    const updatedTicket = await updateTicketStatus(ticketId, status);

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.json({
      success: true,
      message: "Ticket status updated successfully!",
      ticket: updatedTicket,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: error.issues?.[0]?.message || "Validation error",
      });
    }
    throw new Error("Error updating ticket status: " + (error as Error).message);
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    if (req.body._method === "DELETE") {
      const { ticketId } = req.body;
      await removeTicket(ticketId);
      res.json({ success: true, message: "Ticket deleted successfully!" });
    }
  } catch (error) {
    throw new Error("Error deleting ticket: " + (error as Error).message);
  }
};

export const getUserSupportTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await getUserTickets(req.user.id);
    res.json({ success: true, tickets });
  } catch (error) {
    throw new Error("Error fetching user tickets: " + (error as Error).message);
  }
};
