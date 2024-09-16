/*
  Warnings:

  - You are about to drop the column `showId` on the `episode` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `episode` DROP FOREIGN KEY `Episode_showId_fkey`;

-- AlterTable
ALTER TABLE `episode` DROP COLUMN `showId`;
