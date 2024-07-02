# MediLog Backend Documentation

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Contribution](#contribution)
4. [Endpoints](#endpoints)
   - [GET /](#get-)

- [Event Payload](#event-payload)
- [License](#license)

**\_Note: development server url: https://backend-w4ap.onrender.com/**

## Installation

1. Clone the repository:

   ```bash
    git clone git@github.com:Medilog-org/Backend.git
    cd Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

- Or run on dev using nodemon
  ```bash
  npm run dev
  ```

## Configuration

Configuration settings can be adjusted in the `config/index.ts` file. Make sure to set the appropriate values for your environment.

## Contribution

1. First create a new branch
2. Run `npm run build`
3. Run `npm run format`
4. Next run `git add .`
5. Run `git commit -m "commit message" --no-verify`
6. Push to the newly created branch and open a pull request to the master branch.

## Endpoints

### GET /

**Description**: Welcome message and documentation link.

**Response**:

```json
{
  "message": "Welcome to MediLogs Server",
  "docs": "https://docs.medilog.com"
}
```

## User Requests

For detailed information about the user APIs, refer to the [User Documentation](./docs/user_endpoints.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
