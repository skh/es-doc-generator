class Template {
  constructor(templates) {
    this.templatesAsStrings = [];
    templates.forEach(t => {
      this.templatesAsStrings.push(JSON.stringify(t));
    });
  }

  fill(variables) {
    const names = Object.keys(variables);
    //console.log("filling for variables ", JSON.stringify(variables));
    let returnStrings = [];
    this.templatesAsStrings.forEach(t => {
      let returnString = t;
      names.forEach(name => {
        const rex = new RegExp(`##${name}##`, 'g');
        returnString = returnString.replace(rex, variables[name]);
      });
      returnStrings.push(JSON.parse(returnString));
    });
    return returnStrings;
  } 
}

module.exports = Template;