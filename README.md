# Elasticsearch document generator

This tool generates elasticsearch documents and sends them to an elasticsearch cluster.

To get started:

* Clone this repository and run `npm install` or your preferred variant on it.
* Copy `config.json.in` to `config.json` and fill it in appropriately.
* Look at the files in `jobs/` to get an idea how a job is set up.
* Run the tool with `node es-doc-generator.js YOUR_JOBFILE`.

I've developed this with `node` version `10.15.1` and not tested with anything else. Comments, ideas and PRs welcome.

## Jobs for testing the Infrastructure UI:

* Have a real metricbeat instance send (at least) system metrics to your elasticsearch instance so that it installs index templates (it does so by default).
* Change the `index` in the job description so that that it matches the template, i.e. use something like `metricbeat-8.0.0-2019.03.21` if you have an index template called `metricbeat-8.0.0-*`.
* [jobs/two-level-grouping.json]: Sends data that can be grouped by `cloud.machine.type` and `cloud.region` in the waffle map.
