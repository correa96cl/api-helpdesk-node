/*
  Warnings:

  - Added the required column `stateIdState` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "idHistory" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL,
    "taskIdTask" TEXT NOT NULL,
    "stateIdState" INTEGER NOT NULL,
    CONSTRAINT "History_taskIdTask_fkey" FOREIGN KEY ("taskIdTask") REFERENCES "tasks" ("idTask") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "History_stateIdState_fkey" FOREIGN KEY ("stateIdState") REFERENCES "State" ("idState") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_History" ("createdAt", "idHistory", "taskIdTask") SELECT "createdAt", "idHistory", "taskIdTask" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
