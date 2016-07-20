# Searchngin
Search engine para desafio JusBrasil

## Install
1. Run `npm install`
2. Run `npm start`
3. Navigate to `http://localhost:3000/`


## API
###Endpoints
* `curl -X POST http://localhost:3000/entities -d '{"title": "Some title", "type": "TOPIC”}`
* `curl -XGET http://localhost:3000/entities/?q=som`
* `curl -XGET http://localhost:3000/entities/?q=som&entitytype=topic`

## Heroku Demo
###[searchngin.herokuapp.com](https://searchngin.herokuapp.com)
API in demo is at [https://searchngin.herokuapp.com/entities](https://searchngin.herokuapp.com/entities)

## Run tests
`npm test`