import Validate from 'Validate'

describe('Validate', () => {
  it('returns errors if required data is missing', () => {
    let {valid, errors} = Validate({})
    expect(valid).toEqual(false)
    expect(errors).toEqual("to can't be blank; from can't be blank; subject can't be blank; html can't be blank; text can't be blank; redirect can't be blank")
  })

  it('returns true if required data is present', () => {
    let {valid} = Validate({
      to: ['t@e.com'],
      from: 't@e.com',
      subject: "Sub",
      redirect: "re/direct",
      html: "<body/>",
      text: "Hi"
    })
    expect(valid).toEqual(true)
  })

  it('returns false if body is null', () => {
    let {valid} = Validate(null)
    expect(valid).toEqual(false)
  })

  it('returns false if body is undefined', () => {
    let {valid} = Validate(undefined)
    expect(valid).toEqual(false)
  })

  it('returns errors if data is invalid', () => {
    let {valid, errors} = Validate({
      from: ['from'],
      bcc: 'bcc',
      cc: [['cc']],
      to: 'to',
      subject: ['subject'],
      reply: 'reply',
      bounce: ['bounce']
    })
    expect(valid).toEqual(false)
    expect(errors).toEqual("to must be a string[]; from must be a string; bcc must be a string[]; cc must be a string[]; subject must be a string; reply must be a string[]; bounce must be a string; html can't be blank; text can't be blank; redirect can't be blank")
  })
})