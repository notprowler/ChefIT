# ChefIT

## Requirements

- Python 3.12.4
- Node 20.18.2

## How to run

MacOS

```bash
cd backend
python3 -m venv .venv
source venv/bin/activate
pip install -r requirements.txt
python3 -m fastapi dev main.py
Open http://127.0.0.1:8000
```

## Running Tests

### Backend Tests

To run the backend tests:

```bash
cd backend
python -m pytest
```

### Frontend Tests

#### Unit Tests

To run the frontend unit tests with Jest:

```bash
cd frontend
npm test
```

To run the tests in watch mode:

```bash
cd frontend
npm run test:watch
```

#### End-to-End Tests

To run the frontend end-to-end tests with Playwright:

```bash
cd frontend
npm run test:e2e
```

### Continuous Integration

This project uses GitHub Actions for continuous integration. The workflow automatically runs:

1. Frontend unit tests with Jest
2. Frontend end-to-end tests with Playwright
3. Backend tests with pytest

The workflow is triggered on:

- Push to main/master branches
- Pull requests to main/master branches

You can view the workflow configuration in `.github/workflows/test.yml`.

## How to deploy

### Prerequisites

- Python 3.12
- Docker
- Google Cloud Run CLI

Build the backend docker image

```bash
docker buildx build --platform linux/amd64 -t gcr.io/chefit-453802/chefit:<version> --build-arg VERSION=latest --load .
```

Push the docker image to GCR

```bash
docker push gcr.io/chefit-453802/chefit:<version>
```

Deploy docker image to google cloud run

```bash
gcloud run deploy chefit-service \
  --image gcr.io/chefit-453802/chefit:<version> \
  --platform managed \
  --region us-east4 \
  --allow-unauthenticated \
  --set-env-vars SPOONACULAR_API_KEY=your_api_key_here \
  --set-env-vars FRONTEND_URL=frontend_url \
  --max-instances=1
```

Build the frontend docker image

```bash
docker build --platform linux/amd64 -t gcr.io/chefit-453802/chefit-frontend:<version> --build-arg VITE_BACKEND_URL=deployed_backend_url .
```

Push the frontend docker image to GCR

```bash
docker push gcr.io/chefit-453802/chefit-frontend:<frontend-version>
```

Deploy the frontend docker image to google cloud run

```bash
gcloud run deploy chefit-frontend \
  --image gcr.io/chefit-453802/chefit-frontend:<frontend-version> \
  --platform managed \
  --region us-east4 \
  --allow-unauthenticated \
  --max-instances=1
```
