# ChefIT

## Requirements

- Python 3.12.4
- Node 20.18.2

## How to run

MacOS

```bash
cd backend
python3 -m venv .venv
source venv/scripts/activate
pip install -r requirements.txt
python3 -m fastapi dev main.py
Open http://127.0.0.1:8000
```

## Deployment

### Prerequisites

- Python 3.12
- Docker
- Google Cloud Run CLI

```bash
# Build and push the backend Docker image
docker build -t gcr.io/$GCP_PROJECT_ID/fastapi-backend:latest backend/
docker push gcr.io/$GCP_PROJECT_ID/fastapi-backend:latest

# Deploy the backend to Cloud Run (us-east4, max 1 instance) with the SPOONACULAR_API_KEY env variable
gcloud run deploy fastapi-backend \
  --image gcr.io/$GCP_PROJECT_ID/fastapi-backend:latest \
  --region us-east4 \
  --platform managed \
  --allow-unauthenticated \
  --max-instances=1 \
  --set-env-vars SPOONACULAR_API_KEY=$SPOONACULAR_API_KEY

# Retrieve the backend service URL
SERVICE_URL=$(gcloud run services describe fastapi-backend --region us-east4 --platform managed --format='value(status.url)')
echo $SERVICE_URL

# Build and push the frontend Docker image with the backend URL as a build argument
docker build --build-arg VITE_BACKEND_URL=$SERVICE_URL -t gcr.io/$GCP_PROJECT_ID/vite-frontend:latest frontend/
docker push gcr.io/$GCP_PROJECT_ID/vite-frontend:latest

# Deploy the frontend to Cloud Run (us-east4, max 1 instance)
gcloud run deploy vite-frontend \
  --image gcr.io/$GCP_PROJECT_ID/vite-frontend:latest \
  --region us-east4 \
  --platform managed \
  --allow-unauthenticated \
  --max-instances=1
```
