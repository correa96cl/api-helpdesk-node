import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { prisma } from "../../../lib/prisma";

export async function getSubTypeByTypeTask(app: FastifyInstance) {

    app.withTypeProvider<ZodTypeProvider>().get('/subTypeTasks/:idTypeTask', {
        schema: {
            tags: ['SubTypeTasks'],
            summary: 'Get subtypes by type of task',
            params: z.object({
                idTypeTask: z.string(),
            }),
            response: {
                200: z.array(z.object({
                    idSubTypeTask: z.number().nullable(),
                    descriptionSubTypeTask: z.string().nullable()
                }))
            }
        }
    }, async (request, reply) => {
        const { idTypeTask } = request.params;
        const idTypeTaskNumber = Number(idTypeTask);

        const subTypeTasks = await prisma.subTypeTask.findMany({
            select: {
                idSubTypeTask: true,
                descriptionSubTypeTask: true
            },
            where: {
                typeTaskIdTypeTask: idTypeTaskNumber
            },
            orderBy: {
                descriptionSubTypeTask: 'asc'
            }
        })
        return reply.send(subTypeTasks)


    }
    )
}