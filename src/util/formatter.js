export const formatter = new Intl.NumberFormat('en-GB', {
  notation: 'compact',
  compactDisplay: 'short',
});
const fromCamelCaseToTitleCase = (str) => {
  const string = str.replace(/([A-Z])/g, ' $1');
  return string.charAt(0).toUpperCase() + string.slice(1);
};
