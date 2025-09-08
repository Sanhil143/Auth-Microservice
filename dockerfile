# --- Stage 1: Build ---
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install ALL deps (including dev for building TS)
RUN npm install

# Copy rest of the code
COPY . .

# Build TypeScript -> dist/
RUN npm run build

# --- Stage 2: Run (production) ---
FROM node:18-alpine

WORKDIR /app

# Copy only required files from build stage
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Expose API port
EXPOSE 3000

# Start app with compiled JS
CMD ["npm","run", "start"]
