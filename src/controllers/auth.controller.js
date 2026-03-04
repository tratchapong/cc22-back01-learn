
export function register(req, res) {

  const myErr = new Error('My Custom Error!!')
  myErr.status = 444
  // myErr.message = 'My Custom Error!!'
  throw(myErr)
  res.json('Register service')
}

export function login(req, res) {
  res.json('Login service')
}

export function getMe(req, res) {
  res.json('Getme service')
}
