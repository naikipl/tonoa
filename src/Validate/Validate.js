const REQUIRED_DATA = ['to', 'from', 'subject', 'html', 'text']

const DATA_TYPES = {
  to: 'string[]',
  from: 'string',
  bcc: 'string[]',
  cc: 'string[]',
  subject: 'string',
  reply: 'string[]',
  bounce: 'string',
  html: 'string',
  text: 'string',
  redirect: 'string'
};

const isType = (type, item) => {
  return (
    (type === 'string[]') &&
    Array.isArray(item) &&
    item.every(i => isType('string', i))
  ) || (typeof item === type)
}

const validate = (key, item) => {
  let errors = []
  if (REQUIRED_DATA.includes(key) && !item) {
    errors.push(`${key} can't be blank`)
  }
  if (item && !isType(DATA_TYPES[key], item)) {
    errors.push(`${key} must be a ${DATA_TYPES[key]}`)
  }
  return errors.join('; ')
}

export default (body) => {
  let errors = ""
  if (body) {
    errors = Object.keys(DATA_TYPES)
                   .map(key => validate(key, body[key]))
                   .filter(error => error.length)
                   .join('; ')
  } else {
    errors = "body can't be empty"
  }
  return {valid: !errors.length, errors}
}