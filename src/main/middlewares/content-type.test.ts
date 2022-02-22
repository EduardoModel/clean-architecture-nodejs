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
  test('It should return content-type xml if forced', async () => {
    app.get('/test_content_type_xml', (req, res) => {
      res.type('xml')
      res.send('')
    })

    await supertest(app)
      .get('/test_content_type_xml')
      .expect('content-type', /xml/)
  })
})

/*
  For the main module is more difficult to create unit tests
  because this is the main entry point for the application and all the
  elements will be instantiated within this file.
  It is very difficult to test a module that isn't decoupled from others!
*/
