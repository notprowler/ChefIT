# Stage 1: Build the Vite application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Pass the VITE_SERVER_URL as a build argument
ARG VITE_BACKEND_URL

# Set the environment variable during the build
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

# Stage 2: Serve with Node.js and 'serve'
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g serve
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]