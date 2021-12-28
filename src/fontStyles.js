import { createGlobalStyle } from "styled-components";
import NeueHaasDisplayBoldWoff from "./fonts/NeueHaasDisplayBold.woff";

const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'NeueHaasDisplayBold';
  src:
  url(${NeueHaasDisplayBoldWoff}) format('woff');

}
`;

export default FontStyles;