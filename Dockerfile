FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 8080
RUN npm run build
RUN chown -R node /usr/src/app
CMD ["node", "dist/main"]
