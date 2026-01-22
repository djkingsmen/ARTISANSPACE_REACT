import express from "express";
import {
  deleteTicket,
  getSupportTickets,
  submitSuppotTicket,
  updateTicketStatusController,
  getUserSupportTickets,
} from "../controller/ticketController.js";
import authorizerole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", authorizerole("manager", "admin"), getSupportTickets);

router.get("/user/my-tickets", authorizerole("customer", "artisan", "manager", "admin"), getUserSupportTickets);

router.post(
  "/",
  authorizerole("customer", "artisan", "manager", "admin"),
  submitSuppotTicket
);

router.patch(
  "/:ticketId/status",
  authorizerole("manager", "admin"),
  updateTicketStatusController
);

router.delete("/", authorizerole("manager", "admin"), deleteTicket);

export default router;
