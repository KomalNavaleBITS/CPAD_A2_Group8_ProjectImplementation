FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install cors
COPY . /app
CMD node users.js 3535
EXPOSE 3535