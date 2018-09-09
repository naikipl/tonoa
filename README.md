# tonoa
A tiny node.js cloud function for sending emails using the AWS Lambda platform.

### Setup

    brew install nvm
    nvm use 8
    nvm install-latest-npm
    npm install

### Execute lambda

    ./node_modules/.bin/webpack
    node ./bin/try.js

### Package for deployment

    ./node_modules/.bin/webpack

Then copy/paste `dist/index.js` into the AWS Lambda inline editor.
Make sure to choose Runtime: Node 8.