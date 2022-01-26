import validator from 'validator'
import EmailValidator from './email-validator'

const makeSut = () => {
  const sut = new EmailValidator()

  return { sut }
}

describe('EmailValidator', () => {
  test('it should return true if the validator returns true', () => {
    const { sut } = makeSut()

    const validEmail = 'valid_email@test.com'
    const isEmailValid = sut.isValid(validEmail)

    expect(isEmailValid).toBe(true)
  })

  test('it should return false if the validator returns false', () => {
    validator.isEmailValid = false

    const { sut } = makeSut()

    const invalidEmail = 'invalid_email@test.com'
    const isEmailValid = sut.isValid(invalidEmail)

    expect(isEmailValid).toBe(false)
  })

  test('it should pass the recieved email to the validator', () => {
    const { sut } = makeSut()

    const validEmail = 'valid_email@test.com'
    sut.isValid(validEmail)

    expect(sut.email).toBe(validEmail)
    expect(validator.email).toBe(validEmail)
  })
})
