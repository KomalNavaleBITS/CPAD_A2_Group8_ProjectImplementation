FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install cors
COPY . /app
CMD node assignments.js 3636
EXPOSE 3636