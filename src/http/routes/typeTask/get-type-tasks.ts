import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";

export async function getTypeTasks(app: FastifyInstance) {

    app.withTypeProvider<ZodTypeProvider>().get('/typeTasks', {
        schema: {
            tags: ['TypeTasks'],
            summary: 'Get type of tasks',
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