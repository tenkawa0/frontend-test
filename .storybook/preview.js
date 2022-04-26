import { initialize, mswDecorator } from "msw-storybook-addon";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SnackbarProvider } from "notistack";
import { handlers } from "../src/mocks/handlers";

//for MSW
initialize();

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      method: "alphabetical",
    },
  },
  msw: { handlers: handlers },
  chromatic: { disableSnapshot: true },
};

export const decorators = [
  mswDecorator,
  (Story) => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 1 } },
    });
    return (
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider domRoot={document.body}>
            <Story />
          </SnackbarProvider>
        </LocalizationProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    );
  },
];
