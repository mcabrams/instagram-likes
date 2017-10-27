FROM node:8.7.0
WORKDIR /app
COPY ./package.json ./yarn.lock /app/
# Add node modules to path
ENV PATH $PATH:/app/node_modules/.bin
RUN yarn install
ADD ./ /app/
RUN npm run build
