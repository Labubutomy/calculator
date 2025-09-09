FROM node:18-alpine

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH
ENV REACT_APP_API_HOST=localhost:8080
ENV REACT_APP_PROTOCOL=http

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . ./

CMD ["sh", "entrypoint.sh"]