-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "idTask" TEXT NOT NULL PRIMARY KEY,
    "numberTask" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "userId" TEXT,
    "typeTaskId" INTEGER NOT NULL,
    "subTypeTaskId" INTEGER NOT NULL,
    "idState" INTEGER NOT NULL,
    CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "tasks_typeTaskId_fkey" FOREIGN KEY ("typeTaskId") REFERENCES "TypeTask" ("idTypeTask") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_subTypeTaskId_fkey" FOREIGN KEY ("subTypeTaskId") REFERENCES "SubTypeTask" ("idSubTypeTask") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_idState_fkey" FOREIGN KEY ("idState") REFERENCES "State" ("idState") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("createdAt", "description", "idState", "idTask", "numberTask", "subTypeTaskId", "title", "typeTaskId", "updatedAt", "userId") SELECT "createdAt", "description", "idState", "idTask", "numberTask", "subTypeTaskId", "title", "typeTaskId", "updatedAt", "userId" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
