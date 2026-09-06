import {inngest} from "./client.js";
import {auditlog} from "../store.js";


export const onTodoCreated = inngest.createFunction(
    {
        id: "on-todo-created",
        triggers: [{event: "todo/created"}],
    },
    async({event, step}) => {
        await step.run("audit", async() => {
            auditlog.push({
                action: "created",
                todoId: event.data.todo.id,
                title: event.data.todo.title,
                timestamp: new Date().toISOString(),
            });
            return {ok: true};
        })
    }
)