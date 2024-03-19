import { extendTheme } from "@chakra-ui/react";
import { themeColors } from "./colors";

export default function configTheme(opt?: string) {
  return extendTheme({
    colors: themeColors,
    fonts: {
      body: `'Outfit'`,
      heading: `'Open Sans'`,
    },
  });
}
