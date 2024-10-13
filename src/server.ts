import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";
import { createTask } from "./http/routes/task/create-task";
import { updateTask } from "./http/routes/task/update-task";
import fastifyCors from "@fastify/cors";
import { getTasks } from "./http/routes/task/get-tasks";
import { getTypeParameterOwner } from "typescript";
import { getTypeTasks } from "./http/routes/typeTask/get-type-tasks";
import { getSubTypeByTypeTask } from "./http/routes/subTypeTask/get-subtype-tasks-by-task";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
//app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
    openapi:{
        info:{
            title: "Api do App de HelpDesk",
            description: "Api do App de HelpDesk",
            version: "1.0.0"
        },
        servers: [],
    },
    transform: jsonSchemaTransform,
})


app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  })

  app.register(fastifyCors)


app.register(createTask)
app.register(updateTask)
app.register(getTasks)
app.register(getTypeTasks)
app.register(getSubTypeByTypeTask)

app.listen({ port: 3333 }).then(() => {
    console.log("HTTP server running on http://localhost:3333");
})