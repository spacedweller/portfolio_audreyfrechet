
import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals';
import App from './App'
import styled, { css, createGlobalStyle } from 'styled-components'
import FontStyles from './fontStyles'


const Global = createGlobalStyle`
* {
    box-sizing: border-box;
  }
  
  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background-color: #372720;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
  }
  
  #root {
    overflow: auto;
  }
  
  body {
    position: fixed;
    overflow: hidden;
    overscroll-behavior-y: none;
    font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif;
    color: black;
    -webkit-font-smoothing: antialiased;
  }
  
 
`

ReactDOM.render(
  <React.StrictMode>
    <Global/>
    <FontStyles/>
    <App/>
  </React.StrictMode>,
  document.getElementById('root'),
)

















// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
