ARG APP_DIR=/app

# Current Node LTS (04/2024): node:20-bookworm-slim
FROM node:20.12.0-bookworm-slim as base

# System dependencies
RUN apt-get update -y && apt-get install -y openssl

# Install all dependencies and link libs to module
RUN yarn
RUN npx prisma generate

########################
# Production
########################
FROM base

# Task manager
RUN yarn global add pm2

# Copy server files
COPY . ${APP_DIR}

# Move work directory to the server instance
WORKDIR ${APP_DIR}

RUN yarn build

# Environment setup
ENV PORT=80

# Server command
ENTRYPOINT ["pm2-runtime", "build/index.js"]
