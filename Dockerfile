FROM node:alpine

# Create and set working directory
RUN mkdir /srv/app && chown -R node:node /srv/app
WORKDIR /srv/app

# Copy package and lock files
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
USER node
RUN pnpm install

# Copy source code
COPY --chown=node:node . .

# Build app
RUN pnpm prisma generate
RUN pnpm run build

# Remove dev dependencies
RUN pnpm prune --prod

# Expose port
EXPOSE 3000

# Start app
CMD ["pnpm", "run", "serve"]
