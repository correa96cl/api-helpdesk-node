import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z, { number } from "zod";
import { prisma } from "../../../lib/prisma";

export async function getTasks(app: FastifyInstance) {

    app.withTypeProvider<ZodTypeProvider>().get('/tasks', {
        schema: {
            tags: ['Tasks'],
            summary: 'Get tasks',
            response: {
                200: z.array(z.object({
                    idTask: z.string().uuid(),
                    numberTask: z.number().nullable(),
                    title: z.string(),
                    description: z.string(),
                    userId: z.string().nullable(),
                    typeTaskId: z.number(),
                    subTypeTaskId: z.number(),
                    idState: z.number(),
                }))
            }
        }
    }, async (request, reply) => {

        const tasks = await prisma.task.findMany({
            select: {
                idTask: true,
                numberTask: true,
                title: true,
                description: true,
                userId: true,
                typeTaskId: true,
                subTypeTaskId: true,
                idState: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return reply.send(tasks)


}
    )
}