# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the app using the build
CMD ["npm", "start"]
