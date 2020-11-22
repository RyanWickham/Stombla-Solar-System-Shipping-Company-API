import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'stomble-backend-internship',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    profile: 'ServerlesAccount',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    addSpaceship: {
      handler: 'lambdas/addSpaceship.handler',
      events: [
        {
          http: {
            path: 'add-spaceship/{spaceship}',
            method: 'PUT',
            cors: true
          }
        }
      ]
    }
  }
}

module.exports = serverlessConfiguration;
