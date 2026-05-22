-- AlterTable
ALTER TABLE "events" ADD COLUMN     "pembicara_id" INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_pembicara_id_fkey" FOREIGN KEY ("pembicara_id") REFERENCES "pembicaras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
