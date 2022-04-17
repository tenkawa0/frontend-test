import { ComponentStory, ComponentMeta } from "@storybook/react";
import { rest } from "msw";
import { screen, waitFor, userEvent } from "@storybook/testing-library";
import { expect } from "@storybook/jest";

import { Page } from "components/Page";

export default {
  title: "work/2.ユーザ操作の確認",
  component: Page,
} as ComponentMeta<typeof Page>;

const Template: ComponentStory<typeof Page> = (args) => <Page {...args} />;

export const OpenPopup = Template.bind({});
OpenPopup.storyName = "Todo追加Popupの表示";
//ここに追加
