import React from "react";
import {
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Alert,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import dayjs from "dayjs";

import { CompleteTodoButton } from "./CompleteTodoButton";
import { useTodos } from "hooks/useTodos";

export const TodoList: React.FC = () => {
  const todosQuery = useTodos();

  if (todosQuery.isLoading || todosQuery.isFetching) {
    return (
      <Stack justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
      </Stack>
    );
  }

  if (todosQuery.isError) {
    return (
      <Alert severity="error" sx={{ my: 2 }}>
        データの取得に失敗しました
      </Alert>
    );
  }

  return (
    <List dense>
      {todosQuery.data.map((todo) => {
        const labelId = `checkbox-list-label-${todo.id}`;
        return (
          <ListItem
            key={todo.id}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete-todo"
                onClick={() => alert("削除機能を入れるつもりだった・・・")}
              >
                <Delete />
              </IconButton>
            }
          >
            <ListItemIcon>
              <CompleteTodoButton
                todo={todo}
                labelId={labelId}
                isCompleted={todo.isCompleted}
              />
            </ListItemIcon>
            <ListItemButton
              role={undefined}
              onClick={() => alert("編集機能を入れるつもりだった・・・")}
              disableGutters
            >
              <ListItemText
                id={labelId}
                primary={todo.title}
                {...(todo.isCompleted && {
                  sx: {
                    color: "action.disabled",
                    textDecoration: "line-through",
                  },
                })}
              />
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {`期日：${dayjs.unix(todo.dueDate).format("YYYY/MM/DD")}`}
              </Typography>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
