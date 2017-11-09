FROM nginx:1.13
COPY ./config /etc/nginx/conf.d
COPY ./run.sh ./
RUN apt-get update && apt-get install -y wget
