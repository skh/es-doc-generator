#!/usr/bin/env node

const fs = require('fs');
const elasticsearch = require('elasticsearch');

const Combinator = require('./lib/combinator');
const Template = require('./lib/template');

const myArgs = process.argv.slice(2);

const die = (message = "An error occured.") => {
  console.log(`${message}\n`);
  console.log("Usage: node es-doc-generator JOBFILE");
  process.exit(1);
}

if (myArgs.length !== 1) {
  die('Please provide a path to a job file as argument.');
}

let job, config;

try {
  job = JSON.parse(fs.readFileSync(myArgs[0]));
  config = JSON.parse(fs.readFileSync('./config.json'));
} catch(error) {
  die(`An error occured: ${error}`);
}

const C = new Combinator(job.variables);
const T = new Template(job.template);
const client = new elasticsearch.Client({
  host: config.host,
  httpAuth: `${config.user}:${config.password}`
});

client.ping({
  requestTimeout: 30000,
}, function(error) {
  if (error) {
      console.error('elasticsearch cluster is down!');
  } else {
      console.log('Everything is ok');
  }
});

while (true) {
  client.index({
    index: config.index,
    type: '_doc',
    body: T.fill(C.getCurrent())
}, function(err, resp, status) {
    console.log(err, resp, status);
});
  if (C.hasNext()) {
    C.next();
  } else {
    break;
  }
}

