# Specify the node base image with your desired version, e.g. node:<version>
FROM node:alpine

# Set and create the working directory for this app
WORKDIR /app

# Copy this application's files from the current directory to the filesystem
# of the container at /app
COPY . /app

# Make the container accept traffic on port 8080 at runtime from other
# containers or the host if also published
EXPOSE 8080

# Run this shell command at build time
RUN npm install

RUN npm install nodemon -g

# Start the application
CMD npm run start-prod