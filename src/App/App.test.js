import App from 'App'
import SendEmail from 'SendEmail'
import Validate from 'Validate'

jest.mock('SendEmail')
jest.mock('Validate')

describe('App', () => {
  beforeAll(() => {
    console = {
      log: () => {},
      error: () => {},
      info: () => {}
    }
  })

  it('with invalid event responds with a bad request', () => {
    Validate.mockReturnValueOnce({valid: false})
    let spy = jest.fn()
    App({}, {}, spy)
    expect(spy).toHaveBeenCalledWith(null, {
      headers: {"Access-Control-Allow-Origin": "*"},
      statusCode: 400
    })
  })

  describe('with valid event', () => {
    let ev

    beforeEach(() => {
      Validate.mockReturnValueOnce({valid: true})
      SendEmail.mockResolvedValueOnce()
      ev = {body: "to%5B%5D=t%40e.com&from=t%40e.com&redirect=re%2Fdirect&subject=Sub"}
    })

    it('sends an email with decoded data', () => {
      App(ev, {}, () => {})
      expect(SendEmail).toHaveBeenCalledWith({
        to: ['t@e.com'],
        from: 't@e.com',
        subject: "Sub",
        redirect: "re/direct"
      }, expect.anything())
    })

    it('configures with stageVariables', () => {
      ev = {body: "", stageVariables: {region: 'us-east-2'}}
      App(ev, {}, () => {})
      expect(SendEmail).toHaveBeenCalledWith(expect.anything(), {region: 'us-east-2'})
    })

    it('responds with a redirect', () => {
      let spy = jest.fn()
      App(ev, {}, spy)
      expect(spy).toHaveBeenCalledWith(null, {
        headers: {
          Location: "re/direct",
          "Access-Control-Allow-Origin": "*"
        },
        statusCode: 301
      })
    })
  })

  it('responds with an exception when sending mail fails', async () => {
    Validate.mockReturnValueOnce({valid: true})
    SendEmail.mockRejectedValueOnce({message: "exception"})
    let spy = jest.fn()
    await App({}, {}, spy)
    expect(spy.mock.calls[1][1]).toEqual({
      headers: {"Access-Control-Allow-Origin": "*"},
      statusCode: 500
    })
  })
})