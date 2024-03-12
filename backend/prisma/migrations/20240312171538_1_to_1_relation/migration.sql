/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `ImageRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ImageRequest_imageId_key" ON "ImageRequest"("imageId");
