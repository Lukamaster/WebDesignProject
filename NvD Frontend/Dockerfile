FROM node:lts-alpine3.18 as BUILD

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g npm@9.7.2

RUN npm install --legacy-peer-deps

COPY . .

RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

FROM nginx:stable-alpine3.17

COPY --from=BUILD /app/build/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]


#CMD ["npm", "start"]
