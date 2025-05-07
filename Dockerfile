# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json bun.lockb ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration (optional, using default for now)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add support for single-page application routing
RUN sed -i "/location \/ {/a \\\n    try_files \$uri \$uri/ /index.html;" /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]