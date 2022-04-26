import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";

import { Page } from "components/Page";

export default {
  title: "sample/1.画面の初期表示",
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Primary = Template.bind({});
Primary.storyName = "正常表示";
Primary.parameters = {
  chromatic: { disableSnapshot: false },
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

export const Error = Template.bind({});
Error.storyName = "エラー";
Error.parameters = {
  chromatic: { disableSnapshot: false },
  msw: {
    handlers: {
      getTodos: rest.get("/todos", (req, res, ctx) => res(ctx.status(500))),
    },
  },
};
