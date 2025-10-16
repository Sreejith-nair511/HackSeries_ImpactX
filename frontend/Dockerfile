# Use Node.js 18 as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Install serve to serve the static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["serve", "-s", "dist", "-l", "3000"]