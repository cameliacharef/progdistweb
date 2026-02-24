FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --production --no-audit --no-fund

# Copy source
COPY . .

# Expose port
EXPOSE 8081

# Start
CMD ["node", "index.js"]
