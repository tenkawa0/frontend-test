import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";
import { screen, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Page } from "components/Page";

export default {
  title: "sample/1.画面の初期表示",
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Primary = Template.bind({});
Primary.storyName = "正常表示";
Primary.play = async () => {
  await waitFor(
    () => expect(screen.queryByRole("progressbar")).not.toBeInTheDocument(),
    { timeout: 5000 }
  );
  await waitFor(() =>
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(
      "モックデータその1"
    )
  );
};

export const Loading = Template.bind({});
Loading.storyName = "ローディング";
Loading.parameters = {
  msw: {
    handlers: {
      getTodos: rest.get("/todos", (req, res, ctx) =>
        res(ctx.delay("infinite"))
      ),
    },
  },
};
Loading.play = async () => {
  await waitFor(() =>
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  );
};

export const Error = Template.bind({});
Error.storyName = "エラー";
Error.parameters = {
  msw: {
    handlers: {
      getTodos: rest.get("/todos", (req, res, ctx) => res(ctx.status(500))),
    },
  },
};
Error.play = async () => {
  await waitFor(
    () => expect(screen.queryByRole("progressbar")).not.toBeInTheDocument(),
    { timeout: 5000 }
  );
  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "データの取得に失敗しました"
    )
  );
};
