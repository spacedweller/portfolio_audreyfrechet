import { createGlobalStyle } from "styled-components";
import NeueHaasDisplayBoldWoff from "./fonts/NeueHaasDisplayBold.woff";
import RobotoCondensed from "./fonts/RobotoCondensed-Bold.ttf"
import Montserrat from "./fonts/Montserrat-VariableFont_wght.ttf"

const FontStyles = createGlobalStyle`

@font-face {
  font-family: 'NeueHaasDisplayBold';
  src:
  url(${NeueHaasDisplayBoldWoff}) format('woff');

}

@font-face {
  font-family: 'RobotoCondensed';
  src:
  url(${RobotoCondensed}) format('truetype');

}

@font-face {
  font-family: 'Montserrat';
  src:
  url(${Montserrat}) format('truetype');

}
`;



export default FontStyles;