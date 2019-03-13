FROM node:latest
WORKDIR /usr/src/app/
COPY /package.json .
COPY /package-lock.json .
RUN ["npm", "install", "--only=prod"]
COPY . .
EXPOSE 3004
CMD ["npm", "run", "start"]