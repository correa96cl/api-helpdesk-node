import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";


export async function updateTask(app: FastifyInstance) {

    app.
        withTypeProvider<ZodTypeProvider>()
        .put('/tasks/:taskId', {
            schema: {
                tags: ['Tasks'],
                summary: 'Update task',
                params: z.object({
                    taskId: z.string().uuid(),
                }),
                response: {
                    204: z.null(),
                },
            },

        }, async (request, reply) => {

            const { taskId } = request.params;

            /*await prisma.task.update({
                where: {
                    taskId
                }
            });*/

            return reply.status(204).send()

        },)

}