class Template {
  constructor(template) {
    this.templateAsString = JSON.stringify(template);
  }

  fill(variables) {
    const names = Object.keys(variables);
    let returnString = this.templateAsString;
    names.forEach(name => {
      const rex = new RegExp(`##${name}##`, 'g');
      returnString = returnString.replace(rex, variables[name]);
    });

    return JSON.parse(returnString);
  } 
}

module.exports = Template;