import {renderToString} from 'react-dom/server'
import home from './home'

export default () => {
  const html = renderToString(home())

  return `
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="theme-color" content="#000000">
                <link rel="shortcut icon" href="/favicon.ico">
                <link type="text/css" rel="stylesheet" href="//use.fontawesome.com/releases/v5.15.3/css/all.css" />
                <link type="text/css" rel="stylesheet" href="/normalize.css" />
                
                <title>We Vacuumlabs</title>
            </head>
            <body>
                ${html}
            </body>
        </html>
    `
}
