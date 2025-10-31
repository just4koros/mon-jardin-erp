// routes/agents.js
import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const agents = await prisma.agent.findMany({ include: { orders: true } });
  res.json(agents);
});

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, region } = req.body;
    const agent = await prisma.agent.create({
      data: { name, email, phone, region },
    });
    res.json(agent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
