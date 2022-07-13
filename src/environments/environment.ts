// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  version: require('../../package.json').version,

  // base_url: 'http://172.16.1.45:8050', //VM
  // base_url: 'https://staging-gateway.ndh01.com', //Staging
  base_url: 'https://dev-gateway.ndh01.com', //Dev
  //base_url: 'https://gw22.ndhgo.com', //Production

  // storeFrontBaseUrl: 'https://stage.nextdoorhub.com', //VM
  // storeFrontBaseUrl: 'https://staging-react.ndh01.com', //Staging
  storeFrontBaseUrl: 'https://dev-react.ndh01.com', //Dev
  //storeFrontBaseUrl: 'https://my.ndhgo.com', //Production

  // nodeBaseURL: 'http://192.168.2.20:5001', //VM
  // nodeBaseURL: 'https://staging-react.ndh01.com', //Staging
  nodeBaseURL: 'https://dev-react.ndh01.com', //Dev
  //nodeBaseURL: 'https://my.ndhgo.com', //Production

  localBaseUrl: location.origin,
  client_token: 'ZsPdUgSTQbt26kFiRKG/PQ==',
  s3bucket_config: {
    bucketName: 'ndhbucket',
    region: 'ap-south-1',
    accessKeyId: 'AKIAZ6HUSXMNQNPTXKTP',
    secretAccessKey: '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',
  },
  reIndexurl: 'http://192.168.2.55/api/sync/v1/reindex',
  flash_sales: 'http://192.168.2.55/api/v1/flash_sales',
};