import { prisma } from "../../../lib/prisma";

export async function getNumberTask(){

    const numberTask = (await (prisma.task.findMany())).length+1;
    return numberTask;
}