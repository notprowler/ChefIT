# Stage 1: Builder
FROM python:3.12.4 AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# Stage 2: Final Image
FROM python:3.12.4-slim
WORKDIR /app
# Copy application code from the builder stage
COPY --from=builder /app /app
# Reinstall dependencies in the final image
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
