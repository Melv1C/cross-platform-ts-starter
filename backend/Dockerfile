# ---- Builder Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Copy core package definition and source
COPY ../core/package.json ./core/package.json
COPY ../core/src ./core/src
COPY ../core/tsconfig.json ./core/tsconfig.json

# Copy backend package definition
COPY package*.json ./

# Install dependencies for backend (will also fetch core via file:../core)
RUN npm install --production=false

# Build core package first
RUN cd core && npm run build

# Copy remaining backend source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build backend
RUN npm run build

# ---- Runner Stage ----
FROM node:22-alpine

WORKDIR /app

# Set NODE_ENV to production
ENV NODE_ENV=production

# Copy necessary files from builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated/prisma ./src/generated/prisma
COPY --from=builder /app/core/dist ./core/dist

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]