
import React from 'react'
import { Button, ButtonGroup, Col, Row } from 'react-bootstrap'
import { Friends } from '../../types/users'
import Loading from '../common/Loading'
import ModalParent from './ModalParent'

export default function ListFriendModal (props: {
  open: boolean
  toogleOpen: (open: boolean) => void
  loading: boolean
  friends: Friends
}) {
  return (
  <ModalParent
    open={props.open}
    title="My Friends"
    toogleOpen={props.toogleOpen}>

    <Row className="justify-content-center">
      <Col className="text-center">
        {props.loading
          ? <Loading/>
          : <ButtonGroup vertical>
          {props.friends.map((friend, idx) => (
            <Button size="lg" key={idx} variant="dark">{friend.username}</Button>
          ))}
        </ButtonGroup>
        }
      </Col>
    </Row>

  </ModalParent>
  )
}
