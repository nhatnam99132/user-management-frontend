FROM node:22 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM httpd:2.4
COPY --from=build /app/build /usr/local/apache2/htdocs/
COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh
EXPOSE 80
CMD ["entrypoint.sh"]
