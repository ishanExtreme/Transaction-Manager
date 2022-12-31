import React from 'react'
import { ButtonGroup, Card, Col, Row } from 'react-bootstrap'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { Friends } from '../../types/users'
import IconButton from '../common/IconButton'

// eslint-disable-next-line @typescript-eslint/naming-convention
const calulcate_share = (amount: number, involved_users: Friends, non_members: string): number => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const total_users = involved_users.length + non_members.split(',').length
  return amount / total_users
}

export default function TransactionCard (props: {
  name: string
  category: string
  amount: number
  involved_users: Friends
  non_members: string
}): JSX.Element {
  return (
    <Card>
      <Card.Header>{props.name}</Card.Header>
      <Card.Body className='text-center'>
        <Card.Text>
          <Row>
            <Col xs={12}>
              <p className='fw-bold text-primary'>
                Category: {props.category}
              </p>
            </Col>
            <Col xs={12}>
              <p className='fw-bold text-primary'>
                Amount: {props.amount}
              </p>
            </Col>
            <Col xs={12}>
              <p className='fw-bold text-primary'>
                Share per user: {calulcate_share(props.amount, props.involved_users, props.non_members)}
              </p>
            </Col>
            <Col xs={12}>
              <p className='fw-bold text-primary'>
                Users Involved:
              </p>
            </Col>
            <Col xs={12} className="mb-2" style={{ overflow: 'auto' }}>
            <ButtonGroup>
              {props.involved_users.map((user, idx) => (
                  <IconButton variant='dark' key={idx} text={user.username}>
                    <HiOutlineUserCircle/>
                  </IconButton>
              ))}
              </ButtonGroup>
            </Col>
            <Col xs={12} style={{ overflow: 'auto' }}>
              <ButtonGroup>
              {props.non_members.split(',').map((user, idx) => (
                  <IconButton variant='secondary' key={idx} text={user}>
                    <HiOutlineUserCircle/>
                  </IconButton>
              ))}
              </ButtonGroup>
            </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
