# Use an official Python image
FROM python:3.12.4

# Set environment variable in "KEY=VALUE" format
ENV PYTHONUNBUFFERED=True

# Create and use a directory for your app
WORKDIR /app

# Upgrade pip
RUN pip install --upgrade pip

# Copy only the requirements file first (for faster caching of pip installs)
COPY backend/requirements.txt /app/requirements.txt

# Install Python dependencies
RUN pip install --no-cache-dir -r /app/requirements.txt

# Copy the entire project into /app
# This allows you to have backend, frontend, etc. all in one container
COPY . /app

# Expose the port (FastAPI default in your code is 8080)
EXPOSE 8080

# Run the FastAPI app with uvicorn
# If "main.py" is inside "backend/" and defines `app = FastAPI()`, use "backend.main:app"
CMD ["uvicorn", "main:app", "--app-dir", "backend", "--host", "0.0.0.0", "--port", "8080"]
