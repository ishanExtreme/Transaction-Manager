
import React, { useState } from 'react'
import { Button, ButtonGroup, Col, Dropdown, Form, InputGroup, Row } from 'react-bootstrap'
import { Friends } from '../../types/users'
import { triggerToast } from '../../utils/notification'
import IconButton from '../common/IconButton'
import ModalParent from './ModalParent'
import { HiOutlineXCircle } from 'react-icons/hi2'
import { TransactionCreateApi } from '../../types/transaction'
import { addTransaction } from '../../api/api'

export default function AddTransactionModal (props: {
  open: boolean
  toogleOpen: (open: boolean) => void
  friends: Friends
}): JSX.Element {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)
  const [nonMember, setNonmember] = useState('')

  const [users, setUsers] = useState<Friends>([])
  const [nonMembers, setNonMembers] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleNameChange = (e: any): void => {
    setName(e.target.value)
  }

  const handleCategoryChange = (e: any): void => {
    setCategory(e.target.value)
  }

  const handleAmountChange = (e: any): void => {
    setAmount(e.target.value)
  }

  const handleNonMemberChange = (e: any): void => {
    setNonmember(e.target.value)
  }

  const handleUserAdd = (e: any): void => {
    e.preventDefault()
    setUsers((users) => [...users, { username: e.target.text }])

    console.log(e.target.text)
  }

  const handleRemoveUser = (remUser: string): void => {
    setUsers((users) => users.filter((u) => u.username !== remUser))
  }

  const handleNonmemberAdd = (): void => {
    if (nonMember === '') {
      triggerToast('error', 'Please enter a name!')
      return
    }
    setNonMembers((nonMembers) => [...nonMembers, nonMember])
    setNonmember('')
  }

  const handleNonmemberRemove = (user: string): void => {
    setNonMembers((nonMembers) => nonMembers.filter((u) => u !== user))
  }

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)

    if (amount <= 0 || name === '' || category === '') {
      setLoading(false)
      triggerToast('error', 'Amount, name and category are required!')
      return
    }

    const data: TransactionCreateApi = {
      name,
      category,
      amount,
      involved_users: users,
      non_members: nonMembers.toString()
    }

    try {
      await addTransaction(data)
      // props.editBudget(budget)
      setLoading(false)
      window.location.reload()
      // triggerToast('success', 'Transaction added succesfully!')
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <ModalParent
    open={props.open}
    title="Add Friend"
    toogleOpen={props.toogleOpen}
    loading={loading}
    handleSubmit={handleSubmit}
    >
      <Form as={Row} className='justify-content-center'>
        <Form.Group as={Col} xs={6} className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
          required
          type="text"
          placeholder="Give your transaction a name"
          onChange={handleNameChange}
          />
        </Form.Group>

        <Form.Group as={Col} xs={6} className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
          required
          type="text"
          placeholder="Give your transaction a category"
          onChange={handleCategoryChange}
          />
        </Form.Group>

        <Form.Group as={Col} xs={12} className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Text className="text-muted">
            ₹
          </Form.Text>
          <Form.Control
          required
          type="number"
          placeholder="Amount in rupees"
          onChange={handleAmountChange}
          />
        </Form.Group>

        {/* member users(friends) */}
        <Col xs={6}>
          <Dropdown>
            <Dropdown.Toggle variant="info">
              Split with friends
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {props.friends.map((friend, idx) => (
                <Dropdown.Item key={idx} onClick={handleUserAdd}>{friend.username}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* non member users */}
        <Col xs={6} className="mb-3">
          <InputGroup >
            <Form.Control
              placeholder="Add non a member user"
              onChange={handleNonMemberChange}
              value={nonMember}
            />
            <Button onClick={handleNonmemberAdd} variant="outline-secondary">
              Add User
            </Button>
          </InputGroup>
        </Col>

        <Col xs={12} className="mb-3" style={{ overflow: 'auto' }}>
          <ButtonGroup>
          {users.map((user, idx) => (
              <IconButton variant='dark' onClick={() => handleRemoveUser(user.username)} key={idx} text={user.username}>
                <HiOutlineXCircle/>
              </IconButton>
          ))}
          </ButtonGroup>
        </Col>
        <Col xs={12} style={{ overflow: 'auto' }}>
          <ButtonGroup>
          {nonMembers.map((user, idx) => (
              <IconButton variant='secondary' onClick={() => handleNonmemberRemove(user)} key={idx} text={user}>
                <HiOutlineXCircle/>
              </IconButton>
          ))}
          </ButtonGroup>
        </Col>
      </Form>
    </ModalParent>
  )
}
