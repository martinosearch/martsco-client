# Client App
FROM node:14-alpine as builder
WORKDIR /app
ADD package*.json ./

# RUN apk update && apk add bash
RUN npm install
COPY . .

# RUN npm run-script build
RUN npm run build --prod

CMD [ "npm", "start"]

FROM nginx:alpine
COPY nginx/etc/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder app/dist/martsco usr/share/nginx/html
