export function formatDate(date: Date | string, type?: 'digit' | 'text') {
  let options = {};
  if (type === 'digit') options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  if (type === 'text') options = { month: 'long', day: 'numeric', year: 'numeric' };

  const dateToFormat = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(undefined, options).format(dateToFormat);
}
