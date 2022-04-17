import { rest } from "msw";
import { Todo } from "types/Todo";

export const handlers = {
  getTodos: rest.get("*/todos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<Todo[]>([
        {
          id: "todo-1",
          title: "モックデータその1",
          dueDate: 1650726000,
          isCompleted: true,
        },
        {
          id: "todo-2",
          title: "モックデータその2",
          dueDate: 1650726000,
          isCompleted: false,
        },
        {
          id: "todo-3",
          title: "モックデータその3",
          dueDate: 1650726000,
          isCompleted: false,
        },
      ])
    );
  }),
  postTodos: rest.post("*/todo", (req, res, ctx) => {
    return res(ctx.delay(2000), ctx.status(201), ctx.json({ id: "new-todo" }));
  }),
  patchTodos: rest.patch("*/todo/:id", (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ id: "update-todo" })
    );
  }),
};
