-- CreateTable
CREATE TABLE "tasks" (
    "idTask" TEXT NOT NULL PRIMARY KEY,
    "numberTask" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idState" INTEGER NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "typeTaskId" INTEGER NOT NULL,
    "subTypeTaskId" INTEGER NOT NULL,
    "stateId" INTEGER NOT NULL,
    CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("idUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_typeTaskId_fkey" FOREIGN KEY ("typeTaskId") REFERENCES "TypeTask" ("idTypeTask") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_subTypeTaskId_fkey" FOREIGN KEY ("subTypeTaskId") REFERENCES "SubTypeTask" ("idSubTypeTask") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State" ("idState") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "idUser" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "TypeTask" (
    "idTypeTask" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descriptionTypeTask" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "taskIdTask" TEXT
);

-- CreateTable
CREATE TABLE "SubTypeTask" (
    "idSubTypeTask" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descriptionSubTypeTask" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "State" (
    "idState" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descriptionState" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "History" (
    "idHistory" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL,
    "taskIdTask" TEXT NOT NULL,
    CONSTRAINT "History_taskIdTask_fkey" FOREIGN KEY ("taskIdTask") REFERENCES "tasks" ("idTask") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
