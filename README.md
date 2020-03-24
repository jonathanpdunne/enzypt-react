# enzypt.io

## Example src/config.js

```
const environment = 'dev' // valid options: 'production', 'dev'

export const API_URL =
  environment === 'dev' ? 'http://localhost:3001' : 'https://api.enzypt.io'
export const NETWORK = environment === 'dev' ? 4 : 1
```
