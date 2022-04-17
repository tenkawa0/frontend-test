import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";
import { screen, waitFor, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Page } from "components/Page";

export default {
  title: "sample/2.ユーザ操作の確認",
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const OpenPopup = Template.bind({});
OpenPopup.storyName = "Todo追加Popupの表示";
OpenPopup.play = async () => {
  await waitFor(
    () => expect(screen.queryByRole("progressbar")).not.toBeInTheDocument(),
    { timeout: 5000 }
  );
  await userEvent.click(screen.getByRole("button", { name: "追加" }));
  await waitFor(() =>
    expect(
      screen.getByRole("dialog", { name: "add-todo-popup" })
    ).toBeInTheDocument()
  );
};

export const InputTodo = Template.bind({});
InputTodo.storyName = "Todoの入力";
InputTodo.play = async (context) => {
  await OpenPopup.play?.(context);
  const title = "テストTodoを入力";
  await userEvent.type(screen.getByLabelText("Todo Title"), title, {
    delay: 100,
  });
  await expect(screen.getByLabelText("Todo Title")).toHaveValue(title);
};

export const InputDueDate = Template.bind({});
InputDueDate.storyName = "期日の入力";
InputDueDate.play = async (context) => {
  await OpenPopup.play?.(context);
  await userEvent.click(screen.getByRole("button", { name: /Choose date/ }));
  await waitFor(() =>
    userEvent.click(screen.getByRole("button", { name: "Apr 22, 2022" }))
  );
  await expect(screen.getByText("2022/04/22")).toBeInTheDocument();
};

export const Submit = Template.bind({});
Submit.storyName = "Todo追加(成功)";
Submit.play = async (context) => {
  await InputTodo.play?.(context);
  await userEvent.click(screen.getByRole("button", { name: "submit-todo" }));
  await waitFor(
    () =>
      expect(screen.getByRole("alert")).toHaveTextContent("Todoを追加しました"),
    { timeout: 5000 }
  );
  await waitFor(() =>
    expect(
      screen.queryByRole("dialog", { name: "add-todo-popup" })
    ).not.toBeInTheDocument()
  );
};

export const SubmitError = Template.bind({});
SubmitError.storyName = "Todo追加(失敗)";
SubmitError.parameters = {
  msw: {
    handlers: {
      postTodos: rest.post("*/todo", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    },
  },
};
SubmitError.play = async (context) => {
  await InputTodo.play?.(context);
  await userEvent.click(screen.getByRole("button", { name: "submit-todo" }));
  await waitFor(
    () =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Todoの追加に失敗しました"
      ),
    { timeout: 5000 }
  );
  await expect(
    screen.getByRole("dialog", { name: "add-todo-popup" })
  ).toBeInTheDocument();
};
