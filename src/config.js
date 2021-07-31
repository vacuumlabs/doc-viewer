import createS3Client from './s3.js'
import transenv from 'transenv'

export default transenv.default()(({str, bool}) => {
  const env = str('NODE_ENV', 'development')
  const isDev = env === 'development'
  const disableAuth = bool('disable_auth', false) && isDev

  return {
    apiKey: str('API_KEY'),
    disableAuth,
    /* eslint-disable indent */
    ...(disableAuth
      ? {}
      : {
          ssoKey: str('VL_SSO_KEY'),
          ssoUrl: str('VL_SSO_URL'),
          ghOrganization: str('GH_ORGANIZATION'),
        }),
    /* eslint-enable indent */
    port: str('PORT'),
    authorizationMaxAge: str('AUTHORIZATION_MAX_AGE'),
    cacheMaxRecords: 1000,
    s3: createS3Client({
      region: str('REGION'),
      bucket: str('BUCKET'),
      accessKeyId: str('ACCESS_KEY_ID'),
      secretAccessKey: str('SECRET_ACCESS_KEY'),
    }),
    draftPath: 'draft',
    finalPath: 'final',
  }
})
