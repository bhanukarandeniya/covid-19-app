FROM node:12

#creating working directory
WORKDIR /usr/src/app

#Ensure package and package-lock being moved
COPY package*.json ./

RUN npm install

#Bundle app
COPY . /usr/src/app

#EXPOSE 9000

CMD ["node","app.js"]


