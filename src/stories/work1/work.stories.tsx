import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Page } from "components/Page";

export default {
  title: "work/1.画面の初期表示",
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const Primary = Template.bind({});
Primary.storyName = "正常表示";
//ここに追加

export const Loading = Template.bind({});
Loading.storyName = "ローディング";
//ここに追加

export const Error = Template.bind({});
Error.storyName = "エラー";
//ここに追加
