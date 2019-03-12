FROM node:latest
WORKDIR /usr/src/app/
COPY /package.json .
COPY /package-lock.json .
RUN ["npm", "install"]
COPY . .
EXPOSE 3333
CMD ["npm", "run", "start"]