FROM node:latest as build
WORKDIR /webclient


COPY package.json .
RUN npm i --force
COPY . .
RUN npm run build


FROM nginx:1.19

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /webclient/build /usr/share/nginx/html