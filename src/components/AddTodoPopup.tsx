import React, { useState, useEffect } from "react";
import {
  Stack,
  IconButton,
  Popover,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { bindPopover, PopupState } from "material-ui-popup-state/hooks";
import dayjs from "dayjs";

import { useTodoMutations } from "hooks/useTodoMutations";

type Props = {
  popupState: PopupState;
};

export const AddTodoPopup: React.FC<Props> = ({ popupState }) => {
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [title, setTitle] = useState("");

  const { postTodo } = useTodoMutations();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dueDate || !title) {
      return console.error("validation error");
    }
    postTodo.mutate(
      {
        title: title,
        dueDate: dueDate.getTime(),
        isCompleted: false,
      },
      {
        onSuccess: () => popupState.close(),
      }
    );
  };

  useEffect(() => {
    if (!popupState.isOpen) return;
    setTitle("");
    setDueDate(new Date());
  }, [popupState.isOpen]);

  return (
    <Popover
      {...bindPopover(popupState)}
      role="dialog"
      aria-label="add-todo-popup"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextField
            label="Todo Title"
            variant="filled"
            size="small"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              "& .MuiFilledInput-root": { bgcolor: "background.paper" },
              "& .MuiFilledInput-root:hover": {
                bgcolor: "action.hover",
              },
              "& .MuiFilledInput-root.Mui-focused": {
                bgcolor: "background.paper",
              },
              width: 500,
            }}
          />
          <Stack direction="row">
            <DatePicker
              label="Custom input"
              value={dueDate}
              onChange={(newValue) => {
                setDueDate(newValue);
              }}
              renderInput={({ inputRef, inputProps, InputProps }) => {
                return (
                  <Stack direction="row" spacing={2} alignItems="center">
                    {InputProps?.endAdornment}
                    <Typography ref={inputRef}>
                      {dayjs(inputProps?.value).format("YYYY/MM/DD")}
                    </Typography>
                  </Stack>
                );
              }}
            />
            <IconButton
              type="submit"
              color="primary"
              disabled={
                !Boolean(title) || !Boolean(dueDate) || postTodo.isLoading
              }
              aria-label="submit-todo"
              sx={{ ml: "auto" }}
            >
              <Send />
              {postTodo.isLoading && (
                <CircularProgress size={20} sx={{ position: "absolute" }} />
              )}
            </IconButton>
          </Stack>
        </Stack>
      </form>
    </Popover>
  );
};
