import React, { useState } from "react";
import { Checkbox } from "@mui/material";

import { useTodoMutations } from "hooks/useTodoMutations";
import { Todo } from "types/Todo";

type Props = {
  todo: Todo;
  labelId: string;
  isCompleted: boolean;
};

export const CompleteTodoButton: React.FC<Props> = ({
  todo,
  labelId,
  isCompleted,
}) => {
  const [checked, setChecked] = useState(isCompleted);

  const { patchTodo } = useTodoMutations();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (patchTodo.isLoading) return;
    e.stopPropagation();
    setChecked(e.target.checked);
    patchTodo.mutate({
      id: todo.id,
      isCompleted: e.target.checked,
    });
  };

  return (
    <Checkbox
      edge="start"
      checked={checked}
      inputProps={{ "aria-labelledby": labelId }}
      onChange={handleChange}
      {...(isCompleted && {
        sx: {
          "&.Mui-checked": { color: "action.disabled" },
        },
      })}
    />
  );
};
