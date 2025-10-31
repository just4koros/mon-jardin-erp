-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "farmerId" INTEGER,
    "buyerId" INTEGER,
    "product" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "deliveryLocation" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "assignedAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);
