-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SubTypeTask" (
    "idSubTypeTask" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descriptionSubTypeTask" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "typeTaskIdTypeTask" INTEGER,
    CONSTRAINT "SubTypeTask_typeTaskIdTypeTask_fkey" FOREIGN KEY ("typeTaskIdTypeTask") REFERENCES "TypeTask" ("idTypeTask") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SubTypeTask" ("descriptionSubTypeTask", "idSubTypeTask", "isActive") SELECT "descriptionSubTypeTask", "idSubTypeTask", "isActive" FROM "SubTypeTask";
DROP TABLE "SubTypeTask";
ALTER TABLE "new_SubTypeTask" RENAME TO "SubTypeTask";
CREATE TABLE "new_TypeTask" (
    "idTypeTask" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descriptionTypeTask" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "taskIdTask" TEXT,
    "subTypeTaskIdSubTypeTask" INTEGER NOT NULL
);
INSERT INTO "new_TypeTask" ("descriptionTypeTask", "idTypeTask", "isActive", "subTypeTaskIdSubTypeTask", "taskIdTask") SELECT "descriptionTypeTask", "idTypeTask", "isActive", "subTypeTaskIdSubTypeTask", "taskIdTask" FROM "TypeTask";
DROP TABLE "TypeTask";
ALTER TABLE "new_TypeTask" RENAME TO "TypeTask";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
