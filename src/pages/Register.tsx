/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { navigate } from 'raviger'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { User, UserRegisterApi } from '../types/users'
import { Card, Col, Stack } from 'react-bootstrap'

import { register } from '../api/api'
import Loading from '../components/common/Loading'
import { triggerToast } from '../utils/notification'

function Register (props: { user?: User }) {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value)
  }

  const handlePassword1Change = (e: any) => {
    setPassword1(e.target.value)
  }

  const handlePassword2Change = (e: any) => {
    setPassword2(e.target.value)
  }

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
  }

  useEffect(() => {
    if (props.user != null) { navigate('/dashboard') }
  }, [])

  const switchToLogin = () => {
    navigate('/login')
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (password1 !== password2) {
      triggerToast('warning', "Password doesn't match")
      return
    }

    const user: UserRegisterApi = { username, email, password: password1 }

    setLoading(true)

    try {
      await register(user)
      triggerToast('success', 'Registared succesfully!')
      navigate('/login')
    } catch (error) {
      setLoading(false)
    }

    setLoading(false)
  }

  return (
    <Row className='justify-content-center'>
      <Col xs={6}>
        <Card>
          <Card.Body>
            <Card.Title className='text-center'>Register Page</Card.Title>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                  required
                  type="text"
                  placeholder="Enter username"
                  onChange={handleUsernameChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                  required
                  type="email"
                  placeholder="Enter Email"
                  onChange={handleEmailChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  onChange={handlePassword1Change}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                  required
                  type="password"
                  placeholder="Retype Password"
                  onChange={handlePassword2Change}
                  />
                </Form.Group>
                <Stack gap={3}>
                  <Col xs={12} className='text-center'>
                    {loading
                      ? <Loading />
                      : <Button variant="primary" type="submit">
                        Register
                      </Button>
                    }
                  </Col>
                  <Col xs={12} className='text-center'>
                      <Button variant="info" onClick={switchToLogin}>
                        Switch to Login
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

export default Register
