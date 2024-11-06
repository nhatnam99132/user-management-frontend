# Stage 1: Build the React app
FROM node:22 AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Stage 2: Serve the app with httpd
FROM httpd:2.4

# Copy the build output to the Apache server's root directory
COPY --from=build /app/build /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Start the Apache server
CMD ["httpd-foreground"]
