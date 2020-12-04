# covid-tracking-app
Covid tracking sample application

Project setup

Without docker
    -  Install npm
    -  Import database scripts to a local MYSQL DB server
    -  Set env config values in env.dev and .env files
    -  Set the node env in the start script(in package.jason) as development or prod
    -  Execute "npm start"
    -  Import postman scripts and test 


Redis Server setup
    - Use the following link for Ubuntu, to setup the Redis cache locally
      https://tecadmin.net/install-redis-ubuntu/



############################################################################################

With docker compose

Run the docker compose file.

docker-compose -f docker-compose.yml up --build

Data will be fetch automatically if the created tables are empty
You can set the Covid Incident records (COVID_RECORDS) and max person records per covid incident (PERSON_RECORDS) 
as environment variables
It would take considerable amount of time to get mysql container up and running properly,
till then application will keep restarting, so bear with..