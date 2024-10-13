/*
  Warnings:

  - You are about to drop the column `subTypeTaskIdSubTypeTask` on the `TypeTask` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TypeTask" (
    "idTypeTask" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descriptionTypeTask" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "taskIdTask" TEXT
);
INSERT INTO "new_TypeTask" ("descriptionTypeTask", "idTypeTask", "isActive", "taskIdTask") SELECT "descriptionTypeTask", "idTypeTask", "isActive", "taskIdTask" FROM "TypeTask";
DROP TABLE "TypeTask";
ALTER TABLE "new_TypeTask" RENAME TO "TypeTask";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
