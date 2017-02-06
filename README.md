# good-stackdriver-transform

a transform stream for turning [good](https://github.com/GainCompliance/good-stackdriver-transform)
server events into `jsonPayload` formatted [LogEntry](https://cloud.google.com/logging/docs/api/reference/rest/v2/LogEntry)
messages for [Stackdriver Logging](https://cloud.google.com/logging/) on the
[Google Cloud Platform](https://cloud.google.com/)

[![npm](https://img.shields.io/npm/v/good-stackdriver-transform.svg?maxAge=2592000)](https://www.npmjs.com/package/good-stackdriver-transform)
[![license](https://img.shields.io/github/license/GainCompliance/good-stackdriver-transform.svg)](LICENSE)

[![Build Status](https://img.shields.io/travis/GainCompliance/good-stackdriver-transform/master.svg?style=flat)](https://travis-ci.org/GainCompliance/good-stackdriver-transform)
[![Codecov](https://img.shields.io/codecov/c/github/GainCompliance/good-stackdriver-transform.svg)](https://codecov.io/github/GainCompliance/good-stackdriver-transform)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/GainCompliance/good-stackdriver-transform.svg)](https://greenkeeper.io/)

## Usage

### Installation

```bash
$ npm install good-stackdriver-transform -S
```

### Config

Include the transform in your good reporter pipeline:

```json
{
  reporters: {
    stackdriver: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{log: '*', request: '*', response: '*', error: '*'}]
      },
      {module: 'good-stackdriver-transform'},
      {
        module: 'good-file',
        args: ['/var/log/app_engine/custom_logs/logs.json']
      }
    ]
  }
}
```

If your application is running in the App Engine flexible environment, you can
[write to a file under `/var/log/app_engine/custom_logs/`](https://cloud.google.com/error-reporting/docs/setup/app-engine-flexible-environment),
as shown above.
