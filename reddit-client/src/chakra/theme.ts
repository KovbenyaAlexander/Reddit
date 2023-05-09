import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import { Button } from "./button";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#FF3c00",
    },
  },
  fonts: {
    body: "Open Sans",
  },
  styles: {
    global: () => ({
      body: {
        bg: "gray.200",
      },
    }),
  },
  components: {
    Button,
  },
});

export { theme };
