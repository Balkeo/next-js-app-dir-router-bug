import "styled-components";
import theme from "~/guidelines/Theme/theme";

/**
 * Forward the theme variable to styled-components
 *
 * @see https://blog.agney.dev/styled-components-&-typescript/
 */
declare module "styled-components" {
  type Theme = typeof theme;

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
