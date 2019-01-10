/**
 * 200 - OK
 * 404 - Not Found
 * 500 - Internal Server Error
 * 201 - Created
 * 304 - Not Modified
 * 400 - Bad Request
 * 401 - Unauthorized
 * 403 - Forbidden
 */

const code = {
  NOT_FOUND_EMAIL: { status: 401, message: 'login failure' },
  INCORRECT_PASSWORD: { status: 401, message: 'Your password is incorrect' }
}

module.exports = (res, exception) => {
  const err = code[exception]
  res.status(err.status).json({ error: err.message })
  return res
}