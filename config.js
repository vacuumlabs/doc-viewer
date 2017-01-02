import transenv from 'transenv'
import path from 'path'

const toAbsolute = (p) => path.isAbsolute(p) ? p : path.join(__dirname, p)

export default transenv()(({str, bool}) => {
  const docsPath = path.join(toAbsolute(str('DOCS_PATH')), 'docs')
  return {
    isHttps: bool('HTTPS'),
    apiKey: str('API_KEY'),
    port: str('PORT'),
    authorizationMaxAge: str('AUTHORIZATION_MAX_AGE'),
    cacheMaxRecords: 1000,
    ghClient: {
      id: str('GH_CLIENT_ID'),
      secret: str('GH_CLIENT_SECRET'),
    },
    ghOrganization: str('GH_ORGANIZATION'),
    docsPath: docsPath,
    draftPath: path.join(docsPath, 'draft'),
    finalPath: path.join(docsPath, 'final'),
  }
})
