import createS3Client from './s3.js'
import transenv from 'transenv'

export default transenv()(({str, bool}) => {
  return {
    isHttps: bool('HTTPS'),
    apiKey: str('API_KEY'),
    ssoKey: str('VL_SSO_KEY'),
    ssoUrl: str('VL_SSO_URL'),
    port: str('PORT'),
    authorizationMaxAge: str('AUTHORIZATION_MAX_AGE'),
    cacheMaxRecords: 1000,
    ghOrganization: str('GH_ORGANIZATION'),
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
