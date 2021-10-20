FROM node:12.18.1
 
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm install request --save
#RUN npm install firebase@^4.8.0 --save

# Bundle app source
COPY . /usr/src/app

EXPOSE 80

CMD [ "npm", "start" ]