## Building containers

`docker-compose -f docker-compose.yml -f docker-compose.test.yml build`
`docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d`
`docker-compose exec web bash`
`python acceptance_tests/test_likes.py`

`docker-compose run asset bash`
`npm run build`

## NGINX configuration between development and test

The nginx configuration does not include an upstream entry because this is
concatted during container creation. This allows us to differentiate the
port we serve to; this is useful for using different ports between the local
development server and the acceptance test server.

## Javascript Tests
`docker-compose run asset bash`
`npm run test` or `npm run test:watch`


## Testing production setup locally (without swarm)

Build and push images:

```
docker build ./web -t mcabrams/instagram_likes_web:x.y.z
docker push mcabrams/instagram_likes_web:x.y.z
docker build ./nginx -t mcabrams/instagram_likes_nginx:x.y.z
docker push mcabrams/instagram_likes_nginx:x.y.z
docker build ./nginx -t mcabrams/instagram_likes_assets:x.y.z
docker push mcabrams/instagram_likes_assets:x.y.z
```

Update `docker-compose.production.yml` with correct images
i.e.

```
  nginx:
    image: mcabrams/instagram_likes_nginx:x.y.z
```

Then run

```
docker-compose -f docker-compose.production.yml up -d
```

and open `localhost` in browser.

## Testing production setup locally (w/ swarm)

Create a couple vms according to here: https://docs.docker.com/get-started/part4/#create-a-cluster

Make a `web.production.env` file from `web.env.example`

Then copy prod yml file and web.production.env

`docker-machine scp docker-compose.production.yml myvm1:~`
`docker-machine ssh myvm1 "mkdir ~/web"`
`docker-machine scp ./web/web.production.env myvm1:~/web/web.production.env`

Then deploy
`docker-machine ssh myvm1 "docker stack deploy -c docker-compose.production.yml instagram_likes"`

It seems like right now you may have to restart nginx manually, one way is to
`docker-machine ssh myvm1`
`docker service scale instagram_likes_nginx=0`
`docker service scale instagram_likes_nginx=1`

Then find ip of one of vms and open in browser.


# Deploying to Production

Set up a swarm with docker cloud and AWS.

Find the AWS ELB public DNS and add appropriate CNAME entry to DNS records. Get
a SSL certificate setup via ACM (https://docs.docker.com/docker-for-aws/load-balancer/).

SSH into manager instance: Go to EC2 on AWS. Go to instances tab and filter by Tag Keys -> Name, then select the name-of-your-stack-Manager. Once that is selected, in the description find Public DNS (IPv4) entry.

Then you can run

`ssh -i ~/path_to_your_appropriate_ssh_key_pair/name_here.pem docker@path-from-public-dns-ipv4-enty`

We'll want set up a web directory so we can scp our env file:

`mkdir web`

And then set the env variable we'll use for the aws.lb.arn label which enables
us to serve via https:

`export ACM_CERT_ARN=arn:aws:acm:us-east-1:341098320918:certificate/yourstufffff`

We'll want to `scp` over needed files outside of manager:
`scp -i ~/path_to_your_appropriate_ssh_key_pair/name_here.pem docker-compose.production.yml docker@path-from-public-dns-ipv4-enty:~`
`scp -i ~/path_to_your_appropriate_ssh_key_pair/name_here.pem ./web/web.production.env docker@path-from-public-dns-ipv4-enty:~/web`

At this point we're ready to deploy:

`docker stack deploy -c docker-compose.production.yml instagram_likes --with-registry-auth`
