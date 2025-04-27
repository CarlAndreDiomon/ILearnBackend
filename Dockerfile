# Use node version 22 as the base image
FROM node:22-slim

# Go to the app directory
WORKDIR /app

# Copy package.json and package-lock.json to the app directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable for the port
ENV PORT=2025

# Expose the port
EXPOSE 2025

# Ensure the start script exists in package.json
CMD ["npm", "run", "start"]
