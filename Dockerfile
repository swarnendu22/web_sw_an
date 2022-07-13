FROM node:14.15.1
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .
RUN npm set unsafe-perm true
RUN npm install
RUN npm run prod-build
EXPOSE 4001
# CMD [ "npm", "start" ]
CMD [ "npm", "run", "start-prod"]
