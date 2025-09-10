# Image Processing API

This project gives you a real-world scenario where you read and write to disk via a Node.js Express server rather than a database. It demonstrates how to set up scalable code and architecture while tying together some of the most popular middleware and utilities found in Node.js projects.

## Getting Started

### Prerequisites

- Node.js (≥ 18)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
```

### Scripts

| Script            | Description                                      |
|-------------------|--------------------------------------------------|
| `npm run build`   | Compile TypeScript to JavaScript (`/dist`)        |
| `npm run start`   | Start compiled server from `/dist`                |
| `npm run dev`     | Run server in development mode with ts-node       |
| `npm run lint`    | Run ESLint                                        |
| `npm run prettier`| Format files with Prettier                        |
| `npm test`        | Run Jasmine tests                                 |

### Running the Server

Create a `.env` file (optional) to specify a custom port:

```
PORT=3001
```

Then start the server:

```bash
npm run dev
```

By default the server runs at:

```
http://localhost:3001
```

---

## API Endpoints

### 1. Health Check

Verify that the server is running.

- **URL**: `/health`
- **Method**: `GET`
- **Response**:
  ```json
  { "ok": true }
  ```

Sample:
```
GET http://localhost:3001/health
```

---

### 2. Image Processing Endpoint

Resize images dynamically.

- **URL**: `/api/images`
- **Method**: `GET`
- **Query Parameters**:

| Name       | Required | Description                             |
|------------|----------|-----------------------------------------|
| `filename` | yes      | Image filename without extension (e.g. `fjord`) |
| `width`    | no       | Desired width in pixels (integer)        |
| `height`   | no       | Desired height in pixels (integer)       |

- **Response**: Resized image (jpg) or JSON error.

Sample:
```
GET http://localhost:3001/api/images?filename=fjord&width=200&height=200
```

This resizes `fjord.jpg` to 200×200 pixels.

If width and height are omitted, the original image is returned.

---

### 3. Thumbnails (Static)

Access pre-generated thumbnails stored in `assets/thumb`.

- **URL**: `/thumb/<filename>`
- **Method**: `GET`
- **Response**: Static image file.

Sample:
```
GET http://localhost:3001/thumb/fjord.jpg
```

---

## Project Structure

```
src/
  index.ts          # Server entry point
  routes/           # Express routers
  utils/            # Image processing functions (Sharp)
assets/
  full/             # Original images
  thumb/            # Cached / resized images
tests/              # Jasmine specs
```

---

## Notes

- Only `.jpg` files are supported by default.
- Caching is implemented so repeated requests for the same dimensions return the cached file from `assets/thumb`.
- Error messages are returned in JSON when requests are invalid.

---



