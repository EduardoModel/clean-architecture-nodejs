import supertest from 'supertest'
import app from './app'

describe('AppSetup', () => {
  test('It should disable x-powered-by header', async () => {
    app.get('/test_x_powered_by', (req, res) => {
      res.send('')
    })
    const res = await supertest(app).get('/test_x_powered_by')

    expect(res.headers['x-powered-by']).toBeUndefined()
  })
})
