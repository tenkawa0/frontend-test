import axios from "axios";
import { useQuery } from "react-query";
import { Todo } from "types/Todo";

export const useTodos = () => {
  const todosQuery = useQuery<Todo[]>(["todos"], async () => {
    const { data } = await axios.get("/todos");
    return data;
  });

  return { ...todosQuery, data: todosQuery.data ?? [] };
};
