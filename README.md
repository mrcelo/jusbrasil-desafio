# Searchngin
Search engine para desafio JusBrasil, React-flavored.

## Install
1. Run `npm install`
2. Run `npm start`
3. Run `npm server`
4. Navigate to `http://localhost:3000/`

### Note
* Best viewed in recent versions of Google Chrome.
* If you are running the server locally, you may need to disable Chrome Web Security on your instance so the localhost elasticsearch client (through ajax) can talk to the elastic API. [Click for more information.](http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome) Naturally the live demo does not present this issue.

## API
###Endpoints
* `curl -X POST http://localhost:3000/entities -d '{"title": "Some title", "type": "TOPIC”}`
* `curl -XGET http://localhost:3000/entities/?q=som`
* `curl -XGET http://localhost:3000/entities/?q=som&entitytype=topic`

## Demo
###[searchngin.herokuapp.com](https://searchngin.herokuapp.com)
API in demo is at [https://searchngin.herokuapp.com/entities](https://searchngin.herokuapp.com/entities)

## Run tests
`npm test`
