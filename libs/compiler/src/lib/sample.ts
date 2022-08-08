type Schema = {
  properties: any;
  required: string[];
};

export const getWidget = (type: string) => {
  const inputTypes = ['integer', 'number', 'email', 'string'];

  if (inputTypes.includes(type)) {
    return 'input';
  }

  if (type === 'array') {
    return 'array';
  }

  if (type === 'boolean') {
    return 'checkbox';
  }
};

export const getFields = (schema: Schema) => {
  const { properties = {}, required = [] } = schema;

  const fields: any[] = [];

  for (const [key, value] of Object.entries(properties)) {
    const { properties, type, ...rest } = value as any;

    const isRequired = required.includes(key);

    const field = {
      ...rest,
      name: key,
      appendable: type === 'array',
      required: isRequired,
      ...(isRequired ? { message: `${key} is required` } : {}),
      ...(type === 'object'
        ? { fields: getFields(value), composable: true }
        : { widget: getWidget(type) }),
    };

    fields.push(field);
  }

  return fields;
};
