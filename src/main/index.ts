import express from 'express'
import setupApp from './config/setup'

const app = express()
setupApp(app)

app.listen(8000, () => console.log('Server is running on port 8000'))
