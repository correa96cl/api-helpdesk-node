/*
  Warnings:

  - Added the required column `subTypeTaskIdSubTypeTask` to the `TypeTask` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TypeTask" (
    "idTypeTask" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descriptionTypeTask" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "taskIdTask" TEXT,
    "subTypeTaskIdSubTypeTask" INTEGER NOT NULL,
    CONSTRAINT "TypeTask_subTypeTaskIdSubTypeTask_fkey" FOREIGN KEY ("subTypeTaskIdSubTypeTask") REFERENCES "SubTypeTask" ("idSubTypeTask") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TypeTask" ("descriptionTypeTask", "idTypeTask", "isActive", "taskIdTask") SELECT "descriptionTypeTask", "idTypeTask", "isActive", "taskIdTask" FROM "TypeTask";
DROP TABLE "TypeTask";
ALTER TABLE "new_TypeTask" RENAME TO "TypeTask";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
