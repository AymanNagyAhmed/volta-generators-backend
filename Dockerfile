# Backend Dockerfile for Development
FROM node:22.12.0-alpine

# Add labels for image identification
LABEL name="volta-backend"
LABEL version="dev"
LABEL description="Volta Backend development image"
LABEL maintainer="AymanNagy.Ahmed@gmail.com"

# Install yarn if not present
RUN if ! yarn --version; then npm install -g yarn@1.22.22; fi

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apk add --no-cache \
    git \
    curl \
    wget \
    build-base \
    g++ \
    libstdc++ \
    python3 \
    openssl

# Create node user and set permissions
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package files
COPY package.json ./
COPY yarn.lock ./

# Clean yarn cache and install dependencies
RUN yarn cache clean && \
    yarn install

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma Client
RUN yarn prisma generate

# Copy rest of the application
COPY . .

# Build the application
RUN yarn build

# Set proper permissions
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose development port
EXPOSE 4000

# Set environment to production
ENV NODE_ENV=production

# production command
CMD ["yarn", "start"]
