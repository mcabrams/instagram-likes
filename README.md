`docker-compose -f docker-compose.yml -f docker-compose.test.yml build`
`docker-compose -f docker-compose.yml -f docker-compose.test.yml up -d`
`docker-compose exec web bash`
`python acceptance_tests/test_likes.py`


## NGINX configuration between development and test

The nginx configuration does not include an upstream entry because this is
concatted during container creation. This allows us to differentiate the
port we serve to; this is useful for using different ports between the local
development server and the acceptance test server.
