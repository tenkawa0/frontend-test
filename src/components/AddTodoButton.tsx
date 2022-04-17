import React from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { usePopupState, bindTrigger } from "material-ui-popup-state/hooks";

import { AddTodoPopup } from "./AddTodoPopup";

export const AddTodoButton: React.FC = () => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "add-todo-popup",
  });

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<Add />}
        {...bindTrigger(popupState)}
      >
        追加
      </Button>
      <AddTodoPopup popupState={popupState} />
    </>
  );
};
