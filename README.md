# FDK Javascript

![GitHub package.json version](https://img.shields.io/github/package-json/v/gofynd/fdk-client-javascript?style=plastic)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/gofynd/fdk-client-javascript/Node.js%20CI?style=plastic)
![GitHub](https://img.shields.io/github/license/gofynd/fdk-client-javascript?style=plastic)
[![Coverage Status](https://coveralls.io/repos/github/gofynd/fdk-client-javascript/badge.svg)](https://coveralls.io/github/gofynd/fdk-client-javascript)

FDK client for Javascript

## Getting Started

Get started with the Javascript Development SDK for Potlee

### Usage

```
npm install fdk-client-javascript --save
```

Using this method, you can `require` fdk-client-javascript like so:

```js
const {
  ApplicationConfig,
  ApplicationClient,
} = require("fdk-client-javascript");
```

### Sample Usage - ApplicationClient

```javascript
const config = new ApplicationConfig({
  applicationID: "YOUR_APPLICATION_ID",
  applicationToken: "YOUR_APPLICATION_TOKEN",
  locationDetails: "LOCATION_DETAILS_OBJECT"
});

const applicationClient = new ApplicationClient(config);

```

### Sample Usage - PlatformClient

```javascript
const { PlatformConfig, PlatformClient } = require("fdk-client-javascript");

let platformConfig = new PlatformConfig({
  companyId: "COMPANY_ID",
  apiKey: "API_KEY", 
  apiSecret: "API_SECRET", 
  domain: "DOMAIN",
  useAutoRenewTimer: true
});

async function getData() {
  try {
    // TODO: get token using OAuth
    platformConfig.oauthClient.setToken(token.access_token);
    const client = new PlatformClient(platformConfig);
  } catch (err) {
    console.log(err);
  }
}

getData();
```

### TypeScript

fdk-client-javascript includes Typescript definitions.

```typescript
import { ApplicationConfig, ApplicationClient } from "fdk-client-javascript";
```

### Documentation

- [Application Front](documentation/application/README.md)
- [Platform Front](documentation/platform/README.md)