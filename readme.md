# ModelVault MiniVault API

A minimal local REST API that simulates a core ModelVault feature: receiving a prompt and returning a generated response.

## Features
- **POST /generate/prompt** endpoint
- Logs all prompt/response interactions to `logs/log.jsonl`
- Input validation using Joi
- Rate limiting (5 requests/minute per IP)
- Swagger UI documentation
- Stubbed (dummy) response for demonstration

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate Swagger documentation:**
   ```bash
   npm run swagger-autogen
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## Usage

Send a POST request to `/generate/prompt` with a JSON body:

```
POST http://localhost:3092/generate/prompt
Content-Type: application/json

{
  "prompt": "Hello, MiniVault!"
}
```

**Response:**
```
{
  "type": "success",
  "message": "Response generated successfully",
  "data": {
    "response": "You said: Hello, MiniVault!"
  }
}
```

## Logging

All prompt/response interactions are logged to `logs/log.jsonl` in JSON Lines format:
```
{"prompt":"Hello, MiniVault!","response":"You said: Hello, MiniVault!","timestamp":"2025-07-10T14:36:44.796Z"}
```

## API Documentation (Swagger)

- After starting the server, open [http://localhost:3092/api/docs/#/](http://localhost:3092/api/docs/#/) in your browser.
- You can try out the endpoints and see request/response examples.
- The `x-access-token` header is supported for authentication (stubbed in this version).

## Improvements & Add-ons
- **Input validation**: Uses Joi for robust request validation.
- **Rate limiting**: Prevents abuse by limiting requests per IP.
- **Swagger UI**: Interactive API docs and testing.
- **Separation of logs**: API logs in `logs/log.jsonl`, server logs in `log/`.

### Further Improvements (Ideas)
- Integrate a local LLM (e.g., Hugging Face, Ollama) for real completions.
- Stream output token-by-token for a more realistic LLM experience.
- Add more detailed error handling and response codes.
- Add unit/integration tests (e.g., with Jest or Mocha).
- Provide a Postman collection or CLI for easier testing.
- Dockerize the app for easy deployment.
- Use environment variables for all config (port, log paths, etc.).
- Add user authentication and role-based access control.

## Project Structure

```
modelvault/
├── bin/
├── config/
├── controllers/
├── interfaces/
├── log/                # Server logs (Winston)
├── logs/               # API prompt/response logs
├── router/
├── server/
├── utils/
├── package.json
├── readme.md
```

---

**Thank you for reviewing this project!**

