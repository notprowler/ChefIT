# Stage 1: Build the Vite application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Pass all Vite environment variables as build arguments
ARG VITE_BACKEND_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY

# Set the environment variables during the build
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
ENV VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}

RUN npm run build

# Stage 2: Serve with Node.js and 'serve'
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g serve
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]