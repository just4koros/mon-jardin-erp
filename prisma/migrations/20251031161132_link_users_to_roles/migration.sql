-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Buyer" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Farmer" ADD CONSTRAINT "Farmer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buyer" ADD CONSTRAINT "Buyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agent" ADD CONSTRAINT "Agent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
