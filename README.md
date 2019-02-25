# Elasticsearch document generator

This tool generates elasticsearch documents and sends them to an elasticsearch cluster.

To get started:

* Clone this repository and run `npm install` or your preferred variant on it.
* Copy `config.json.in` to `config.json` and fill it in appropriately.
* Look at the files in `jobs/` to get an idea how a job is set up.
* Run the tool with `node es-doc-generator.js YOUR_JOBFILE`.

I've developed this with `node` version `10.15.1` and not tested with anything else. Comments, ideas and PRs welcome.

