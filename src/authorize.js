import c from './config'
import r from './routes.js'
import url from 'url'
import querystring from 'querystring'

function saveCookie(res, key, value) {
  res.cookie(key, value, {httpOnly: true, secure: c.isHttps})
}

export function sendToLogin(req, res) {
  saveCookie(res, 'redirectAfterLogin', req.url)
  res.redirect(r.login)
}

export function* login(req, res) {
  const oauthUrl = url.format({
    protocol: c.isHttps ? 'https' : 'http',
    host: req.headers.host,
    pathname: r.oauth,
  })
  res.redirect(`${c.ssoUrl}/$login?${querystring.stringify({url: oauthUrl})}`)
}

export function* oauth(req, res) {
  if (req.query.code) {
    saveCookie(res, 'access_token', req.query.code)
    res.redirect(req.cookies.redirectAfterLogin || r.index)
  } else {
    res.redirect(r.login)
  }
}
