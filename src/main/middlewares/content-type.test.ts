import supertest from 'supertest'
import app from '../config/app'

describe('Content-Type Middleware', () => {
  test('It should return json Content-Type as default', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send('')
    })

    await supertest(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
