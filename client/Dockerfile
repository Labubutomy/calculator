FROM node:24-alpine

WORKDIR /app

ENV PATH=/app/node_modules/.bin:$PATH
ENV REACT_APP_API_HOST=127.0.0.1:8080
ENV REACT_APP_PROTOCOL=http

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@5.0.1 -g --silent

COPY . ./

CMD ["sh", "entrypoint.sh"]