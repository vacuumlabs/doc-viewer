/* eslint-disable max-len */
import React from 'react'
export default () => (
  <style>{`
@import url(https://use.fontawesome.com/releases/v5.0.6/css/all.css);
/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */
html {
  font-family: sans-serif;
  line-height: 1.15;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
}

article, aside, footer, header, nav, section {
  display: block;
}

h1 {
  font-size: 2em;
  margin: 0.67em 0;
}

figcaption, figure, main {
  display: block;
}

figure {
  margin: 1em 40px;
}

hr {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
}

pre {
  font-family: monospace, monospace;
  font-size: 1em;
}

a {
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}

a:active, a:hover {
  outline-width: 0;
}

abbr[title] {
  border-bottom: none;
  text-decoration: underline;
  text-decoration: underline dotted;
}

b, strong {
  font-weight: inherit;
}

b, strong {
  font-weight: bolder;
}

code, kbd, samp {
  font-family: monospace, monospace;
  font-size: 1em;
}

dfn {
  font-style: italic;
}

mark {
  background-color: #ff0;
  color: #000;
}

small {
  font-size: 80%;
}

sub, sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

audio, video {
  display: inline-block;
}

audio:not([controls]) {
  display: none;
  height: 0;
}

img {
  border-style: none;
}

svg:not(:root) {
  overflow: hidden;
}

button, input, optgroup, select, textarea {
  font-family: sans-serif;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
}

button, input {
  overflow: visible;
}

button, select {
  text-transform: none;
}

button, html [type="button"], [type="reset"], [type="submit"] {
  -webkit-appearance: button;
}

button::-moz-focus-inner,
[type="button"]::-moz-focus-inner,
[type="reset"]::-moz-focus-inner,
[type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring,
[type="button"]:-moz-focusring,
[type="reset"]:-moz-focusring,
[type="submit"]:-moz-focusring {
  outline: 1px dotted ButtonText;
}

fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}

legend {
  box-sizing: border-box;
  color: inherit;
  display: table;
  max-width: 100%;
  padding: 0;
  white-space: normal;
}

progress {
  display: inline-block;
  vertical-align: baseline;
}

textarea {
  overflow: auto;
}

[type="checkbox"], [type="radio"] {
  box-sizing: border-box;
  padding: 0;
}

[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {
  height: auto;
}

[type="search"] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}

[type="search"]::-webkit-search-cancel-button, [type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}

details, menu {
  display: block;
}

summary {
  display: list-item;
}

canvas {
  display: inline-block;
}

template {
  display: none;
}

[hidden] {
  display: none;
}

* {
  box-sizing: border-box;
}

body {
  background-color: #e9ebee;
  font-family: "Raleway","Helvetica","Arial",sans-serif;
  color: #2d2d2d;
}

a {
  text-decoration: none;
  color: #2d2d2d;
}

a:hover, a:focus, a:active {
  text-decoration: none;
}

.line {
  position: fixed;
  top: 0;
  z-index: 10;
  display: block;
  width: 100%;
  height: 5px;
  background-color: #f07;
}

.wrapper {
  width: 95%;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: 25px 0 40px 0;
}

.header__logo {
  display: block;
  width: 300px;
  height: 30px;
  margin-top: 10px;
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMzY0LjczIDUzLjA0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2lzb2xhdGlvbjppc29sYXRlO30uY2xzLTJ7ZmlsbDojMjAzMjNmO30uY2xzLTN7ZmlsbDojZTcyMDc2O30uY2xzLTR7b3BhY2l0eTowLjU7bWl4LWJsZW5kLW1vZGU6bXVsdGlwbHk7ZmlsbDp1cmwoI2xpbmVhci1ncmFkaWVudCk7fTwvc3R5bGU+PGxpbmVhckdyYWRpZW50IGlkPSJsaW5lYXItZ3JhZGllbnQiIHgxPSI4LjAyIiB5MT0iMTguMiIgeDI9IjU3Ljc4IiB5Mj0iLTEwLjU0IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMjAzMjNmIi8+PHN0b3Agb2Zmc2V0PSIwLjE4IiBzdG9wLWNvbG9yPSIjMjAzMjNmIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48dGl0bGU+dmFjdXVtbGFic19sb2dvPC90aXRsZT48ZyBjbGFzcz0iY2xzLTEiPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzAuNjksNDAuNywyMi4yNiwyNi4wOWMtMS4zNiwyLjczLTIuMzksNi43LTIuNDMsMTIuNTdsNy4yNiwxMi41N0EyLjIyLDIuMjIsMCwwLDAsMjksNTIuMzRoMy4zNmEyLjIzLDIuMjMsMCwwLDAsMS45Mi0xLjFsMTUuODctMjcuNWEuNzguNzgsMCwwLDAtLjY3LTEuMTdINDIuMWExLjYyLDEuNjIsMCwwLDAtMS40MS44MloiLz48cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik02My44NywwQzQ3LjI4LDI4LjczLDE3LjI4LDAsMTcuMjgsMzQuMjRMLjQ2LDUuMUEzLjQsMy40LDAsMCwxLDMuNCwwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTgyLjQ1LDIyLjU3YTEsMSwwLDAsMSwxLjA4LDEuMDlWNTEuMjVhMSwxLDAsMCwxLTEuMDgsMS4wOUg3Ni45Yy0uNTIsMC0uODktLjM2LTEuMDgtMS4wOWwtLjQ1LTMuNjRRNzEuMjgsNTMsNjUuMjEsNTNhMTMuMTMsMTMuMTMsMCwwLDEtOS44My00LjI0Yy0yLjctMi44MS00LjA3LTYuNi00LjA3LTExLjM2czEuMzctOC41NSw0LjEtMTEuMzlBMTMsMTMsMCwwLDEsNjUsMjEuODJhMTMuMzUsMTMuMzUsMCwwLDEsMTAuMzksNS4xbC4zOS0zLjI2Yy4xMS0uNzMuNDctMS4wOSwxLjA4LTEuMDlabS05LjI4LDIxLjVjMS41OS0xLjQ4LDIuMzctMy42NSwyLjM3LTYuNDZBOSw5LDAsMCwwLDczLjE1LDMxYTgsOCwwLDAsMC01Ljg4LTIuNEE3Ljc0LDcuNzQsMCwwLDAsNjEuNTMsMzFhOC45MSw4LjkxLDAsMCwwLTIuMzEsNi40OUE4LjgxLDguODEsMCwwLDAsNjEuNTYsNDRhNy45Miw3LjkyLDAsMCwwLDUuODIsMi4zNEE4LjE2LDguMTYsMCwwLDAsNzMuMTcsNDQuMDdaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNOTMuNDgsNDguNDdhMTUuNDUsMTUuNDUsMCwwLDEtNC4yOS0xMS4wOCwxNS4zNSwxNS4zNSwwLDAsMSw0LjMyLTExLDE0LjQ5LDE0LjQ5LDAsMCwxLDExLTQuNTEsMTUuNTcsMTUuNTcsMCwwLDEsNi42OCwxLjQyQTEzLjMsMTMuMywwLDAsMSwxMTYsMjdhLjkzLjkzLDAsMCwxLS4yMywxLjUzbC0zLjcsMi43OGExLDEsMCwwLDEtMS40OC0uMTYsOC4wOSw4LjA5LDAsMCwwLTUuODctMi41N0E3LjIyLDcuMjIsMCwwLDAsOTksMzEuMTVhOS4yNiw5LjI2LDAsMCwwLTIuMiw2LjI5LDkuMTcsOS4xNywwLDAsMCwyLjIsNi4zLDcuMzUsNy4zNSwwLDAsMCw1Ljc5LDIuNSw5LjM4LDkuMzgsMCwwLDAsMy41MS0uNzUsNi4yNSw2LjI1LDAsMCwwLDEuNTMtMSw0LjUsNC41LDAsMCwwLC41OS0uNDdsLjQyLS4zM2ExLjE2LDEuMTYsMCwwLDEsMS41My0uMTJMMTE2LDQ2LjI0YTEsMSwwLDAsMSwuMjgsMS40OCwxMi41MSwxMi41MSwwLDAsMS00LjkzLDMuNzYsMTYuMjQsMTYuMjQsMCwwLDEtNi45NCwxLjVBMTQuNDgsMTQuNDgsMCwwLDEsOTMuNDgsNDguNDdaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTQ5LjQsMjIuNTdhMSwxLDAsMCwxLDEuMDksMS4wOVY1MS4yNWExLDEsMCwwLDEtMS4wOSwxLjA5aC01Ljc2Yy0uNjEsMC0xLS4zNi0xLjA5LTEuMDlsLS4zOS0yLjg5QTEzLjQ1LDEzLjQ1LDAsMCwxLDEzMS43OCw1M2MtNy4xNiwwLTExLTUtMTEtMTQuMjZWMjMuNjZhMSwxLDAsMCwxLDEuMDgtMS4wOWg2LjIxYTEsMSwwLDAsMSwxLjA5LDEuMDlWMzguNzhjMCw0LjI2LDIuMjMsNi43Nyw2LDYuNzdzNi42Ni0yLjc2LDYuOTEtOC41NVYyMy42NmExLDEsMCwwLDEsMS4wOC0xLjA5WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE4Ni4xMSwyMi41N2ExLDEsMCwwLDEsMS4wOSwxLjA5VjUxLjI1YTEsMSwwLDAsMS0xLjA5LDEuMDloLTUuNzZjLS42MSwwLTEtLjM2LTEuMDktMS4wOWwtLjM5LTIuODlBMTMuNDYsMTMuNDYsMCwwLDEsMTY4LjQ4LDUzYy03LjE1LDAtMTEtNS0xMS0xNC4yNlYyMy42NmExLDEsMCwwLDEsMS4wOC0xLjA5aDYuMjFhMSwxLDAsMCwxLDEuMDksMS4wOVYzOC43OGMwLDQuMjYsMi4yMiw2Ljc3LDYsNi43N3M2LjY2LTIuNzYsNi45MS04LjU1VjIzLjY2YTEsMSwwLDAsMSwxLjA4LTEuMDlaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjQyLjYyLDI1LjY2YzIuMDksMi41NCwzLjEyLDYsMy4xMiwxMC40MlY1MS4yNWExLDEsMCwwLDEtMS4wOSwxLjA5aC02LjIxYTEsMSwwLDAsMS0xLjA4LTEuMDlWMzYuMDhjMC00LjI2LTIuMi02LjcxLTYtNi43MS00LDAtNi43NCwyLjctNyw4LjQ5VjUxLjI1YTEsMSwwLDAsMS0xLjA5LDEuMDloLTZhMSwxLDAsMCwxLTEuMDktMS4wOVYzNi4wOGMwLTQuMjYtMi4yMi02LjcxLTYtNi43MS00LDAtNi43NCwyLjctNyw4LjQ5VjUxLjI1YTEsMSwwLDAsMS0xLjA5LDEuMDloLTYuMjFhMSwxLDAsMCwxLTEuMDgtMS4wOVYyMy42NmExLDEsMCwwLDEsMS4wOC0xLjA5aDUuODJjLjUzLDAsLjg5LjM2LDEuMDksMS4wOWwuMzMsMi44NGExMi40NywxMi40NywwLDAsMSw5Ljc1LTQuNjIsMTAuMjIsMTAuMjIsMCwwLDEsOS45NCw2LjE4UTIyNywyMS44OCwyMzQsMjEuODhBMTAuNTMsMTAuNTMsMCwwLDEsMjQyLjYyLDI1LjY2WiIvPjxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTI1My44Myw1Mi4zNGMtLjUsMC0uNzYtLjI1LS43My0uNzVWMTEuNjhhLjY2LjY2LDAsMCwxLC43My0uNzVoNC4wNmEuNjQuNjQsMCwwLDEsLjczLjc1VjUxLjU5YS42Ni42NiwwLDAsMS0uNzMuNzVaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjk1Ljg1LDIzLjA3YS42My42MywwLDAsMSwuNzIuNzZWNTEuNTlhLjY1LjY1LDAsMCwxLS43Mi43NWgtMy4yYy0uMzYsMC0uNjItLjI1LS43NS0uNzVsLS4zOS00LjI2YTE0Ljc2LDE0Ljc2LDAsMCwxLTIyLDEuNDUsMTUsMTUsMCwwLDEtNC4yMS0xMSwxNS4yMiwxNS4yMiwwLDAsMSw0LjIxLTExLjE0LDEzLjc0LDEzLjc0LDAsMCwxLDEwLjIyLTQuMjYsMTQuNjIsMTQuNjIsMCwwLDEsMTEuODEsNS44N2wuMzktNC4zOWMuMDgtLjUxLjMzLS43Ni43NS0uNzZabS03LjQ5LDIyLjYyYTkuOCw5LjgsMCwwLDAsMy03LjU1LDExLjA2LDExLjA2LDAsMCwwLTMtOEExMC4wOSwxMC4wOSwwLDAsMCwyODAuNzgsMjdhOS42MSw5LjYxLDAsMCwwLTcuMTgsMywxMC44MiwxMC44MiwwLDAsMC0yLjksNy44LDEwLjUzLDEwLjUzLDAsMCwwLDIuOTMsNy43NCw5LjkyLDkuOTIsMCwwLDAsNy4zOCwzQTEwLjQyLDEwLjQyLDAsMCwwLDI4OC4zNiw0NS42OVoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0zMzIuNDgsMjYuNjFhMTUuMzIsMTUuMzIsMCwwLDEsNC4xNywxMS4xNCwxNSwxNSwwLDAsMS00LjE3LDExQTE0LjA3LDE0LjA3LDAsMCwxLDMyMi4wNiw1MywxMy44NSwxMy44NSwwLDAsMSwzMTAuMiw0N2wtLjQ1LDQuNjJxLS4xNy43NS0uNzUuNzVoLTMuMmEuNjQuNjQsMCwwLDEtLjczLS43NVYxMS42OGEuNjYuNjYsMCwwLDEsLjczLS43NWg0LjA2Yy41MSwwLC43Ni4yNS43My43NVYyOGExNC4yMywxNC4yMywwLDAsMSwxMS42NC01LjY1QTEzLjg3LDEzLjg3LDAsMCwxLDMzMi40OCwyNi42MVptLTQuMTUsMTguODhhMTAuNTIsMTAuNTIsMCwwLDAsMi45Mi03Ljc0LDEwLjc4LDEwLjc4LDAsMCwwLTIuOS03LjgsOS42OSw5LjY5LDAsMCwwLTcuMjEtMywxMCwxMCwwLDAsMC03LjQ5LDMuMTUsMTEuMTIsMTEuMTIsMCwwLDAtMy4wNiw4LDkuNzEsOS43MSwwLDAsMCwzLDcuNTUsMTAuMjYsMTAuMjYsMCwwLDAsNy4zMiwyLjc4QTEwLDEwLDAsMCwwLDMyOC4zMyw0NS40OVoiLz48cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0zNDYuMSw1MS43NmExMS4xMiwxMS4xMiwwLDAsMS00LjY1LTMuMjkuNzUuNzUsMCwwLDEtLjA2LTEuMDlsMS40OC0yLjIyYy4zMS0uNDguNjctLjUxLDEuMTQtLjEyLDEuODcsMi4yOSw0LjgyLDMuNDMsOC45MSwzLjQzLDQuNDMsMCw2LjYzLTEuNTMsNi42LTQuNTdhMywzLDAsMCwwLTEuOTUtMy4xNCwxNi4yMywxNi4yMywwLDAsMC0yLjA5LS43OGMtLjY0LS4xNy0xLjY3LS4zOS0zLjA5LS43LTEuNjQtLjMzLTIuOTUtLjY3LTQtMWExNy42LDE3LjYsMCwwLDEtMy4yMy0xLjM3QTYuMjMsNi4yMywwLDAsMSwzNDEuNzMsMzFhNy40Nyw3LjQ3LDAsMCwxLDMuMTItNi4zMkExMy4yMSwxMy4yMSwwLDAsMSwzNTMsMjIuMzVhMTYuMjcsMTYuMjcsMCwwLDEsMTAuNSwzLjdjLjQ4LjI1LjUzLjYyLjE3LDEuMDlsLTEuNSwyLjEyYS42OC42OCwwLDAsMS0xLjA2LjIyQTEyLjM0LDEyLjM0LDAsMCwwLDM1My4zMSwyN2MtNC4yNiwwLTYuMzcsMS4yOC02LjM3LDMuODdhMi43NCwyLjc0LDAsMCwwLDEsMi4xNyw1LjI3LDUuMjcsMCwwLDAsMi4xNCwxLjIzLDI3LjUxLDI3LjUxLDAsMCwwLDMuMjMuNzUsMy42NiwzLjY2LDAsMCwxLC42NC4xNEEyMy4xMSwyMy4xMSwwLDAsMSwzNjIsMzguMDZhNi41NSw2LjU1LDAsMCwxLDIuNzMsNS43OSw4LjIzLDguMjMsMCwwLDEtMy4wNiw2LjY4QzM1OS42MSw1Mi4yLDM1Ni43NCw1MywzNTMsNTNBMTcuNjIsMTcuNjIsMCwwLDEsMzQ2LjEsNTEuNzZaIi8+PHBhdGggY2xhc3M9ImNscy00IiBkPSJNNjMuODcsMEM0Ny4yOCwyOC43MywxNy4yOCwwLDE3LjI4LDM0LjI0TC40Niw1LjFBMy40LDMuNCwwLDAsMSwzLjQsMFoiLz48L2c+PC9nPjwvZz48L3N2Zz4=); 
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  font-size: 0;
}

.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1rem;
}

.card {
  position: relative;
  border-radius: 0 0 3px 3px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(128, 128, 128, 0.15), 0 2px 4px rgba(128, 128, 128, 0.2);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card:hover {
  box-shadow: 0 7px 14px rgba(128, 128, 128, 0.25), 0 5px 5px rgba(128, 128, 128, 0.22);
}

.card:hover .card__header {
  border-color: #f07;
}

.card__header {
  display: flex;
  width: 100%;
  padding: .5rem 1rem;
  background-color: #f3f3f3;
  border-left: 3px solid transparent;
  transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card__header__icon, .card__header__title {
  position: relative;
  display: inline-block;
  margin: 0;
  font-size: 1.3rem;
}

.card__header__title {
  font-weight: 500;
}

.card__header__icon {
  margin-right: 10px;
}

.card__description {
  margin: 15px;
  font-size: .9em;
}

.card__date {
  display: inline-block;
  margin: 0;
  padding: 15px;
  padding-top: 0;
  font-size: .8em;
  color: #a7a7a7;
}

@media screen and (max-width: 1024px) {
  .cards {
    grid-template-columns: 1fr 1fr;
  }
}

@media screen and (max-width: 768px) {
  .cards {
    grid-template-columns: 1fr;
  }
}

`}
  </style>)
