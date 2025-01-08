# Base image
FROM node:16

# Set the working directory
WORKDIR /backend

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["node", "index.js"]
