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

button::-moz-focus-inner, [type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
  border-style: none;
  padding: 0;
}

button:-moz-focusring, [type="button"]:-moz-focusring, [type="reset"]:-moz-focusring, [type="submit"]:-moz-focusring {
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
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 21.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.0' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 364.7 53' enable-background='new 0 0 364.7 53' xml:space='preserve'%3E%3Cg%3E%3Cdefs%3E%3Crect id='SVGID_1_' width='364.7' height='53'/%3E%3C/defs%3E%3CclipPath id='SVGID_2_'%3E%3Cuse xlink:href='%23SVGID_1_' overflow='visible'/%3E%3C/clipPath%3E%3Cg clip-path='url(%23SVGID_2_)'%3E%3Cdefs%3E%3Crect id='SVGID_3_' y='0' width='364.7' height='53'/%3E%3C/defs%3E%3CclipPath id='SVGID_4_'%3E%3Cuse xlink:href='%23SVGID_3_' overflow='visible'/%3E%3C/clipPath%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%2320323F' d='M30.7,40.7l-8.4-14.6c-1.4,2.7-2.4,6.7-2.4,12.6l7.3,12.6 c0.4,0.7,1.1,1.1,1.9,1.1h3.4c0.8,0,1.5-0.4,1.9-1.1c3.8-6.6,10.1-17.5,15.9-27.5c0.3-0.5-0.1-1.2-0.7-1.2h-7.4 c-0.6,0-1.1,0.3-1.4,0.8L30.7,40.7z'/%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%23E72076' d='M63.9,0C47.3,28.7,17.3,0,17.3,34.2L0.5,5.1c-0.6-1-0.6-2.3,0-3.4 C1.1,0.6,2.2,0,3.4,0H63.9z'/%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%2320323F' d='M82.4,22.6c0.7,0,1.1,0.4,1.1,1.1v27.6c0,0.7-0.4,1.1-1.1,1.1h-5.5 c-0.5,0-0.9-0.4-1.1-1.1l-0.4-3.6c-2.7,3.6-6.1,5.4-10.2,5.4c-3.8,0-7.1-1.4-9.8-4.2c-2.7-2.8-4.1-6.6-4.1-11.4s1.4-8.5,4.1-11.4 c2.7-2.8,5.9-4.2,9.6-4.2c4,0,7.5,1.7,10.4,5.1l0.4-3.3c0.1-0.7,0.5-1.1,1.1-1.1H82.4z M73.2,44.1c1.6-1.5,2.4-3.6,2.4-6.5 c0-2.8-0.8-5-2.4-6.6c-1.6-1.6-3.6-2.4-5.9-2.4c-2.3,0-4.2,0.8-5.7,2.3c-1.5,1.6-2.3,3.7-2.3,6.5c0,2.8,0.8,5,2.3,6.5 c1.6,1.6,3.5,2.3,5.8,2.3C69.7,46.3,71.6,45.5,73.2,44.1'/%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%2320323F' d='M93.5,48.5c-2.9-3-4.3-6.7-4.3-11.1c0-4.3,1.4-8,4.3-11c2.9-3,6.5-4.5,11-4.5 c2.4,0,4.6,0.5,6.7,1.4c2,1,3.6,2.2,4.8,3.7c0.5,0.6,0.4,1.1-0.2,1.5l-3.7,2.8c-0.5,0.4-1,0.3-1.5-0.2c-1.7-1.7-3.7-2.6-5.9-2.6 c-2.4,0-4.3,0.8-5.7,2.5c-1.5,1.7-2.2,3.8-2.2,6.3c0,2.5,0.7,4.6,2.2,6.3c1.5,1.7,3.4,2.5,5.8,2.5c1.4,0,2.6-0.4,3.5-0.8 c0.6-0.2,1.3-0.7,1.5-0.9c0.1-0.1,0.3-0.3,0.6-0.5l0.4-0.3c0.5-0.4,1.1-0.5,1.5-0.1l3.6,2.6c0.5,0.4,0.6,0.9,0.3,1.5 c-1.1,1.5-2.8,2.8-4.9,3.8c-2.1,1-4.5,1.5-6.9,1.5C100,53,96.3,51.5,93.5,48.5'/%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%2320323F' d='M149.4,22.6c0.7,0,1.1,0.4,1.1,1.1v27.6c0,0.7-0.4,1.1-1.1,1.1h-5.8 c-0.6,0-1-0.4-1.1-1.1l-0.4-2.9c-2.8,3.1-6.3,4.7-10.4,4.7c-7.2,0-11-5-11-14.3V23.7c0-0.7,0.4-1.1,1.1-1.1h6.2 c0.7,0,1.1,0.4,1.1,1.1v15.1c0,4.3,2.2,6.8,6,6.8c3.9,0,6.7-2.8,6.9-8.5V23.7c0-0.7,0.4-1.1,1.1-1.1H149.4z'/%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%2320323F' d='M186.1,22.6c0.7,0,1.1,0.4,1.1,1.1v27.6c0,0.7-0.4,1.1-1.1,1.1h-5.8 c-0.6,0-1-0.4-1.1-1.1l-0.4-2.9c-2.8,3.1-6.3,4.7-10.4,4.7c-7.2,0-11-5-11-14.3V23.7c0-0.7,0.4-1.1,1.1-1.1h6.2 c0.7,0,1.1,0.4,1.1,1.1v15.1c0,4.3,2.2,6.8,6,6.8c3.9,0,6.7-2.8,6.9-8.5V23.7c0-0.7,0.4-1.1,1.1-1.1H186.1z'/%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%2320323F' d='M242.6,25.7c2.1,2.5,3.1,6,3.1,10.4v15.2c0,0.7-0.4,1.1-1.1,1.1h-6.2 c-0.7,0-1.1-0.4-1.1-1.1V36.1c0-4.3-2.2-6.7-6-6.7c-4,0-6.7,2.7-7,8.5v13.4c0,0.7-0.4,1.1-1.1,1.1h-6c-0.7,0-1.1-0.4-1.1-1.1V36.1 c0-4.3-2.2-6.7-6-6.7c-4,0-6.7,2.7-7,8.5v13.4c0,0.7-0.4,1.1-1.1,1.1h-6.2c-0.7,0-1.1-0.4-1.1-1.1V23.7c0-0.7,0.4-1.1,1.1-1.1h5.8 c0.5,0,0.9,0.4,1.1,1.1l0.3,2.8c2.7-3.1,5.9-4.6,9.7-4.6c4.6,0,8,2.1,9.9,6.2c2.8-4.1,6.5-6.2,11.2-6.2 C237.7,21.9,240.5,23.1,242.6,25.7'/%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%2320323F' d='M253.8,52.3c-0.5,0-0.8-0.2-0.7-0.8V11.7c0-0.5,0.3-0.8,0.7-0.8h4.1 c0.5,0,0.8,0.3,0.7,0.8v39.9c0,0.5-0.2,0.8-0.7,0.8H253.8z'/%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%2320323F' d='M295.8,23.1c0.5,0,0.8,0.3,0.7,0.8v27.8c0,0.5-0.3,0.8-0.7,0.8h-3.2 c-0.4,0-0.6-0.3-0.8-0.8l-0.4-4.3c-2.9,3.8-6.8,5.7-11.6,5.7c-4.1,0-7.6-1.4-10.4-4.3c-2.8-2.8-4.2-6.5-4.2-11 c0-4.6,1.4-8.3,4.2-11.1c2.8-2.8,6.2-4.3,10.2-4.3c4.8,0,9,2.2,11.8,5.9l0.4-4.4c0.1-0.5,0.3-0.8,0.8-0.8H295.8z M288.4,45.7 c2-1.8,3-4.3,3-7.5c0-3.2-1-5.9-3-8c-2-2.1-4.5-3.1-7.5-3.1c-2.9,0-5.3,1-7.2,3c-1.9,2-2.9,4.6-2.9,7.8s1,5.8,2.9,7.7 c1.9,2,4.4,3,7.4,3C283.9,48.5,286.4,47.6,288.4,45.7'/%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%2320323F' d='M332.5,26.6c2.8,2.9,4.2,6.6,4.2,11.1c0,4.5-1.4,8.2-4.2,11 c-2.8,2.8-6.3,4.3-10.4,4.3c-5,0-9-2-11.9-6.1l-0.4,4.6c-0.1,0.5-0.4,0.8-0.8,0.8h-3.2c-0.5,0-0.8-0.3-0.7-0.8V11.7 c0-0.5,0.2-0.8,0.7-0.8h4.1c0.5,0,0.8,0.3,0.7,0.8V28c3-3.8,6.9-5.7,11.6-5.7C326.3,22.3,329.7,23.8,332.5,26.6 M328.3,45.5 c1.9-2,2.9-4.5,2.9-7.7c0-3.2-1-5.8-2.9-7.8c-1.9-2-4.3-3-7.2-3c-3,0-5.5,1.1-7.5,3.1c-2,2.1-3.1,4.8-3.1,8c0,3.2,1,5.7,3,7.5 c2,1.9,4.4,2.8,7.3,2.8C323.9,48.5,326.3,47.5,328.3,45.5'/%3E%3Cpath clip-path='url(%23SVGID_4_)' fill='%2320323F' d='M346.1,51.8c-2-0.8-3.6-1.9-4.7-3.3c-0.3-0.3-0.4-0.7-0.1-1.1l1.5-2.2 c0.3-0.5,0.7-0.5,1.1-0.1c1.9,2.3,4.8,3.4,8.9,3.4c4.4,0,6.6-1.5,6.6-4.6c0-1.5-0.5-2.5-1.9-3.1c-0.8-0.3-1.4-0.6-2.1-0.8 c-0.6-0.2-1.7-0.4-3.1-0.7c-1.6-0.3-3-0.7-4-1c-1-0.3-2.1-0.8-3.2-1.4c-2.3-1.2-3.5-3.2-3.5-5.9c0-2.6,1-4.8,3.1-6.3 c2.1-1.6,4.8-2.3,8.2-2.3c3.9,0,7.4,1.2,10.5,3.7c0.5,0.3,0.5,0.6,0.2,1.1l-1.5,2.1c-0.3,0.4-0.6,0.5-1.1,0.2 c-2.1-1.7-4.7-2.5-7.8-2.5c-4.3,0-6.4,1.3-6.4,3.9c0,0.9,0.3,1.6,1,2.2c0.6,0.6,1.4,1,2.1,1.2c0.8,0.2,1.9,0.5,3.2,0.8 c0.2,0,0.5,0.1,0.6,0.1c3.5,0.7,6.2,1.7,8,2.9c1.8,1.3,2.7,3.2,2.7,5.8c0,2.8-1,5-3.1,6.7c-2.1,1.7-4.9,2.5-8.6,2.5 C350.4,53,348.1,52.6,346.1,51.8'/%3E%3Cg opacity='0.5' clip-path='url(%23SVGID_4_)'%3E%3Cg%3E%3Cdefs%3E%3Crect id='SVGID_5_' y='0' width='63.9' height='34.2'/%3E%3C/defs%3E%3CclipPath id='SVGID_6_'%3E%3Cuse xlink:href='%23SVGID_5_' overflow='visible'/%3E%3C/clipPath%3E%3Cg clip-path='url(%23SVGID_6_)'%3E%3Cdefs%3E%3Cpath id='SVGID_7_' d='M63.9,0C47.3,28.7,17.3,0,17.3,34.2L0.5,5.1c-0.6-1-0.6-2.3,0-3.4C1.1,0.6,2.2,0,3.4,0L63.9,0z'/%3E%3C/defs%3E%3CclipPath id='SVGID_8_'%3E%3Cuse xlink:href='%23SVGID_7_' overflow='visible'/%3E%3C/clipPath%3E%3Cdefs%3E%3Cfilter id='Adobe_OpacityMaskFilter' filterUnits='userSpaceOnUse' x='-15' y='-27.7' width='93.7' height='89.7'%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3C/defs%3E%3Cmask maskUnits='userSpaceOnUse' x='-15' y='-27.7' width='93.7' height='89.7' id='SVGID_9_'%3E%3Cg filter='url(%23Adobe_OpacityMaskFilter)'%3E%3ClinearGradient id='SVGID_10_' gradientUnits='userSpaceOnUse' x1='0' y1='52.8457' x2='1' y2='52.8457' gradientTransform='matrix(49.7671 -28.7331 -28.7331 -49.7671 1531.9279 2657.6865)'%3E%3Cstop offset='0' style='stop-color:%23FFFFFF'/%3E%3Cstop offset='0.1818' style='stop-color:%23000000'/%3E%3Cstop offset='1' style='stop-color:%23000000'/%3E%3C/linearGradient%3E%3Cpolygon clip-path='url(%23SVGID_8_)' fill='url(%23SVGID_10_)' points='-15,8.6 47.9,-27.7 78.7,25.7 15.8,62 '/%3E%3C/g%3E%3C/mask%3E%3ClinearGradient id='SVGID_11_' gradientUnits='userSpaceOnUse' x1='0' y1='52.8457' x2='1' y2='52.8457' gradientTransform='matrix(49.7671 -28.7331 -28.7331 -49.7671 1531.9279 2657.6865)'%3E%3Cstop offset='0' style='stop-color:%2320323F'/%3E%3Cstop offset='0.1818' style='stop-color:%2320323F'/%3E%3Cstop offset='1' style='stop-color:%2320323F'/%3E%3C/linearGradient%3E%3Cpolygon clip-path='url(%23SVGID_8_)' mask='url(%23SVGID_9_)' fill='url(%23SVGID_11_)' points='-15,8.6 47.9,-27.7 78.7,25.7 15.8,62 '/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
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
