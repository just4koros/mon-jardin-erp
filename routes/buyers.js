// routes/buyers.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const buyers = await prisma.buyer.findMany({ include: { orders: true } });
  res.json(buyers);
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, location } = req.body;
    const buyer = await prisma.buyer.create({
      data: { name, email, phone, location },
    });
    res.json(buyer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
