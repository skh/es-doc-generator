#!/usr/bin/env node

const fs = require('fs');
const Combinator = require('./lib/combinator');

const myArgs = process.argv.slice(2);

const die = (message = "An error occured.") => {
  console.log(`${message}\n`);
  console.log("Usage: node es-doc-generator JOBFILE");
  process.exit(1);
}

if (myArgs.length !== 1) {
  die('Please provide a path to a job file as argument.');
}

let job;

try {
  job = JSON.parse(fs.readFileSync(myArgs[0]));
} catch(error) {
  die(`An error occured: ${error}`);
}

const C = new Combinator(job.variables);
while (true) {
  console.log(C.getCurrent());
  if (C.hasNext()) {
    C.next();
  } else {
    break;
  }
}