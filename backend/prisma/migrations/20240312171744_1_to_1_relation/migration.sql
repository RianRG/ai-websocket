/*
  Warnings:

  - You are about to drop the column `imageId` on the `ImageRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageRequestId]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageRequestId` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ImageRequest" DROP CONSTRAINT "ImageRequest_imageId_fkey";

-- DropIndex
DROP INDEX "ImageRequest_imageId_key";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "imageRequestId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ImageRequest" DROP COLUMN "imageId";

-- CreateIndex
CREATE UNIQUE INDEX "Image_imageRequestId_key" ON "Image"("imageRequestId");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_imageRequestId_fkey" FOREIGN KEY ("imageRequestId") REFERENCES "ImageRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
