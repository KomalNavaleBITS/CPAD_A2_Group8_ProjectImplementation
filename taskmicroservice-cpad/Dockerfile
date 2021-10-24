FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install cors
COPY . /app
CMD node todonotes.js 3434
EXPOSE 3434