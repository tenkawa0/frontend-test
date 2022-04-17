import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import { Todo } from "types/Todo";

export const useTodoMutations = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const postTodo = useMutation(
    (input: Omit<Todo, "id">) => axios.post("/todo", input),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
        enqueueSnackbar("Todoを追加しました", { variant: "success" });
      },
      onError: (e) => {
        enqueueSnackbar("Todoの追加に失敗しました", { variant: "error" });
        console.error(e);
      },
    }
  );
  const patchTodo = useMutation(
    (input: { id: string; isCompleted: boolean }) =>
      axios.patch(`/todo/${input.id}`, input.isCompleted),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["todos"]);
        enqueueSnackbar("Todoを更新しました", { variant: "success" });
      },
      onError: (e) => {
        enqueueSnackbar("Todoの更新に失敗しました", { variant: "error" });
        console.error(e);
      },
    }
  );

  return { postTodo, patchTodo };
};
