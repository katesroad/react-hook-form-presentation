const INPUT_FIELDS = ['integer', 'string', 'email', 'number'];

export const getWidget = (type: string) => {
  if (INPUT_FIELDS.includes(type)) {
    return 'input';
  }

  return '';
};
