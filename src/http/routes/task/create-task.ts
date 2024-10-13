import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function createTask(app: FastifyInstance) {
   app.withTypeProvider<ZodTypeProvider>().post('/tasks', {
       schema: {
           tags: ['Tasks'],
           summary: 'Create task',
           body: z.object({
               title: z.string(),
               description: z.string(),
               status: z.enum(['todo', 'doing', 'done']),
               userId: z.string(),
               idTypeTask: z.number(),
               idSubTypeTask: z.number(),
           }),
           response: {
               201: z.object({
                   taskId: z.string().uuid(),
               })
       },
       }
           },
        async(request, reply) => {

            return reply.status(201).send({
                taskId: '1'
            })

        })
   }