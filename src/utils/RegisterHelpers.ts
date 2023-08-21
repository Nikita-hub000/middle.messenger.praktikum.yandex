import * as Handlebars from 'handlebars/dist/handlebars.runtime';
const registerHelpers = () => {
  Handlebars.registerHelper('eq', (a, b) => a === b);
  Handlebars.registerHelper('isBothTrue', (a, b) => a && b);
};
registerHelpers();

export default registerHelpers;
