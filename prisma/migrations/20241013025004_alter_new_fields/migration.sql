/*
  Warnings:

  - You are about to drop the column `created_at` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "idTask" TEXT NOT NULL PRIMARY KEY,
    "numberTask" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idState" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "typeTaskId" INTEGER NOT NULL,
    "subTypeTaskId" INTEGER NOT NULL,
    "stateId" INTEGER NOT NULL,
    CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_typeTaskId_fkey" FOREIGN KEY ("typeTaskId") REFERENCES "TypeTask" ("idTypeTask") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_subTypeTaskId_fkey" FOREIGN KEY ("subTypeTaskId") REFERENCES "SubTypeTask" ("idSubTypeTask") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State" ("idState") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("description", "idState", "idTask", "numberTask", "stateId", "subTypeTaskId", "title", "typeTaskId", "userId") SELECT "description", "idState", "idTask", "numberTask", "stateId", "subTypeTaskId", "title", "typeTaskId", "userId" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
