import supertest from 'supertest'
import app from '../config/app'

describe('JSON Parser Middleware', () => {
  test('It should should parse body as JSON', async () => {
    app.post('/test_json_parser', (req, res) => {
      res.send(req.body)
    })
    await supertest(app)
      .post('/test_json_parser')
      .send({ data: 'any_data' })
      .expect({ data: 'any_data' })
  })
})
