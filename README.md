# Movie Management System Backend (Express + Sequelize)

Backend for the "Favorite Media" app. Implements a REST API to manage movies & TV shows, supports image/poster uploads, and uses MySQL via Sequelize.

## Quick overview

- Server entry: [server/app.js](server/app.js) — starts the server and syncs the DB. See [`startServer`](server/app.js).
- Routes: [server/routes/router.js](server/routes/router.js) — mounts the media endpoints.
- Controller: [server/controllers/mediaController.js](server/controllers/mediaController.js) exports:
  - [`getAllMedia`](server/controllers/mediaController.js)
  - [`getMediaById`](server/controllers/mediaController.js)
  - [`createMedia`](server/controllers/mediaController.js)
  - [`updateMedia`](server/controllers/mediaController.js)
  - [`deleteMedia`](server/controllers/mediaController.js)
- Model: [`Media`](server/models/Media.js) — Sequelize model for the `media` table.
- DB config: [server/config/database.js](server/config/database.js) — reads connection from [server/.env](server/.env).
- Uploads: [server/middleware/upload.js](server/middleware/upload.js) — multer storage and file filtering.
- Validation: [server/middleware/validation.js](server/middleware/validation.js) — request schemas and `validate` middleware.
- Errors: [server/middleware/errorHandler.js](server/middleware/errorHandler.js) — `notFound` and `errorHandler`.
- Utilities:
  - [`ensureUploadsDir`](server/utils/fileUtils.js) — creates uploads dir on startup.
  - [`getPaginationParams`, `createPaginatedResponse`](server/utils/pagination.js)

## Requirements

- Node 18+ (or compatible)
- MySQL (configured via env)

## Environment

Copy and edit `.env` in [server/.env](server/.env):

PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=favorite_media
DB_USER=****
DB_PASSWORD=****
CLIENT_URL=http://localhost:3000

The server reads these in [server/config/database.js](server/config/database.js).

## Install & run

From the `server` folder:

```sh
npm install
npm run dev   
