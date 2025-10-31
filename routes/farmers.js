// routes/farmers.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// ✅ Get all farmers
router.get("/", async (req, res) => {
  const farmers = await prisma.farmer.findMany({ include: { orders: true } });
  res.json(farmers);
});

// ✅ Add new farmer
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, location } = req.body;
    const farmer = await prisma.farmer.create({
      data: { name, email, phone, location },
    });
    res.json(farmer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
