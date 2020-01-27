FROM node:10.18.1

WORKDIR /react-app

ENV PATH /react-app/node_modules/.bin:$PATH

COPY package.json /react-app/package.json
RUN npm install react-scripts@3.3.0 -g

RUN chown -R node:node . && chmod -R 755 .

USER node
RUN npm install

CMD ["npm", "run", "start"]
