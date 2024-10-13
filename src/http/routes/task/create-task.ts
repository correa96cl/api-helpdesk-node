import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../../lib/prisma";
import { getTasks } from "./get-tasks";
import { getTypeTasks } from "../typeTask/get-type-tasks";
import { count } from "console";
import { getNumberTask } from "./get-obtain-number-task";


export async function createTask(app: FastifyInstance) {
   app.withTypeProvider<ZodTypeProvider>().post('/tasks', {
       schema: {
           tags: ['Tasks'],
           summary: 'Create task',
           body: z.object({
               title: z.string(),
               description: z.string(),
               status: z.number(),
               userId: z.string(),
               idTypeTask: z.number(),
               idSubTypeTask: z.number(),
           }),
           response: {
               201: z.object({
                   taskId: z.string().uuid(),
                   numberTask: z.number(),
               })
       },
       }
           },
        async(request, reply) => {

            console.log(request.body)
            const countAllTasks = getNumberTask();

            const task = await prisma.task.create({
                data: {
                    title: request.body.title,
                    description: request.body.description,
                    idState: request.body.status,
                    typeTaskId: request.body.idTypeTask,
                    subTypeTaskId: request.body.idSubTypeTask,
                    numberTask: (await countAllTasks),
                    createdAt: new Date()
                }
            })

           await prisma.history.create({
                data: {
                    taskIdTask: task.idTask,
                    stateIdState: request.body.status,
                    createdAt: new Date()
                }
            })

            return reply.status(201).send({
                taskId: task.idTask,
                numberTask: (await countAllTasks)
            })

        })
   }