// routes/orders.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Get all orders
router.get("/", async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { farmer: true, buyer: true, assignedAgent: true },
  });
  res.json(orders);
});

// ✅ Add a new order
router.post("/", async (req, res) => {
  try {
    const { farmerId, buyerId, product, quantity, price, deliveryLocation } =
      req.body;
    const order = await prisma.order.create({
      data: {
        farmerId,
        buyerId,
        product,
        quantity,
        price,
        deliveryLocation,
      },
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update order status or assign agent
router.put("/:id", async (req, res) => {
  try {
    const { status, assignedAgentId } = req.body;
    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status, assignedAgentId },
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete order
router.delete("/:id", async (req, res) => {
  try {
    await prisma.order.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
