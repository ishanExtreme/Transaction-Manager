/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { navigate } from 'raviger'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { User, UserLoginApi } from '../types/users'
import { Card, Col, Stack } from 'react-bootstrap'
import { login } from '../api/api'
import Loading from '../components/common/Loading'

function Login (props: { user?: User }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    if (props.user != null) { navigate('/dashboard') }
  }, [])

  const switchToRegister = () => {
    navigate('/register')
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setLoading(true)
    const user: UserLoginApi = { username, password }

    let data
    try {
      data = await login(user)
      localStorage.setItem('token', data.token)
      navigate('/dashboard')

      window.location.reload()

      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Row className='justify-content-center'>
      <Col xs={6}>
        <Card>
          <Card.Body>
            <Card.Title className='text-center'>Login Page</Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                  required
                  type="text"
                  placeholder="Enter username"
                  onChange={handleUsernameChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                  />
                </Form.Group>
                <Stack gap={3}>
                  <Col xs={12} className='text-center'>
                    {loading
                      ? <Loading />
                      : <Button variant="primary" type="submit">
                        Login
                      </Button>
                    }
                  </Col>
                  <Col xs={12} className='text-center'>
                      <Button variant="info" onClick={switchToRegister}>
                        Switch to Register
                    </Button>
                  </Col>
                </Stack>

              </Form>

          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default Login
