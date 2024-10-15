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
                    user: z.object({
                        idUser: z.string()
                    }).nullable(),
                    typeTask: z.object({
                        idTypeTask: z.number(),
                        descriptionTypeTask: z.string()
                    }),
                    subtypeTask: z.object({
                        idSubTypeTask: z.number(),
                        descriptionSubTypeTask: z.string()
                    }),
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
                user: {
                    select: {
                        idUser: true
                    }
                },
                typeTask: {
                    select: {
                        idTypeTask: true,
                        descriptionTypeTask: true
                    }
                },
                subtypeTask: {
                    select: {
                        idSubTypeTask: true,
                        descriptionSubTypeTask: true
                    }
                },
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