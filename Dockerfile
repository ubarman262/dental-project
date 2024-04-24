# Use Node.js as base image
FROM node:latest

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npm run prisma:generate

# Remove frontend/dist and public directories before building
RUN rm -rf frontend/dist && rm -rf public

ENV VITE_API_URL=http://localhost:3001/api

# Build frontend
RUN cd frontend && npm i && npm run build

# Copy built files to public directory
RUN cp -rf frontend/dist/ public

# Remove frontend directory
RUN rm -rf frontend

RUN cd prisma && ls -ltr

# Expose port
EXPOSE 3001

# Command to run the application
CMD ["npm", "start"]
