import React from "react";
import { Stack, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";

import { TodoList } from "./TodoList";
import { AddTodoButton } from "./AddTodoButton";
import { useTodos } from "hooks/useTodos";

export const Page: React.FC = () => {
  const todosQuery = useTodos();
  const total = todosQuery.data.length ?? 0;
  const completedCount =
    todosQuery.data.filter((todo) => todo.isCompleted).length ?? 0;

  return (
    <>
      <Stack sx={{ width: 600 }}>
        <Typography variant="h5">Todo List</Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center">
            <Check fontSize="small" />
            <Typography>{`${completedCount} / ${total}`}</Typography>
          </Stack>
          <AddTodoButton />
        </Stack>
        <TodoList />
      </Stack>
    </>
  );
};
