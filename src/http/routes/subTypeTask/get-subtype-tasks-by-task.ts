import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function getSubTypeByTypeTask(app: FastifyInstance) {

    app.withTypeProvider<ZodTypeProvider>().get('/subTypeTasks', {
        schema: {
            tags: ['SubTypeTasks'],
            summary: 'Get subtypes by type of task',
            response: {
                200: z.array(z.object({
                    taskId: z.string().uuid(),
                    title: z.string(),
                    description: z.string(),
                    status: z.enum(['todo', 'doing', 'done']),
                    userId: z.string(),
                }))
            }
        }
    }, async (request, reply) => {

        return reply.send()


}
    )
}