FROM trion/ng-cli:11.2.12 as builder

RUN mkdir -p /app
WORKDIR /app/

COPY package.json /app/
COPY package-lock.json /app/

RUN npm install

ENV NODE_ENV production

COPY . /app/

RUN npm run build-prod

FROM nginx as deploy

COPY --from=builder /app/dist/blog-demo-fe/* /usr/share/nginx/html/
