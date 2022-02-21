import supertest from 'supertest'
import app from '../config/app'

describe('CORS Middleware', () => {
  test('It should enable CORS', async () => {
    app.get('/test_x_powered_by', (req, res) => {
      res.send('')
    })
    const res = await supertest(app).get('/test_x_powered_by')

    expect(res.headers['access-control-allow-origin']).toBe('*')
    expect(res.headers['access-control-allow-methods']).toBe('*')
    expect(res.headers['access-control-allow-headers']).toBe('*')
  })
})
