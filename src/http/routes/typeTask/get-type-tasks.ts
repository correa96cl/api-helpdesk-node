import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../../lib/prisma";

export async function getTypeTasks(app: FastifyInstance) {

    app.withTypeProvider<ZodTypeProvider>().get('/typeTasks', {
        schema: {
            tags: ['TypeTasks'],
            summary: 'Get type of tasks',
            response: {
                200: z.array(z.object({
                    idTypeTask: z.number(),
                    descriptionTypeTask: z.string()
                }))
            }
        }
    }, async (request, reply) => {

        const typeTasks = await prisma.typeTask.findMany({
            select: {
                idTypeTask: true,
                descriptionTypeTask: true
            }, orderBy: {
                descriptionTypeTask: 'asc'
            }
        })

        return reply.send(typeTasks)


    }
    )
}