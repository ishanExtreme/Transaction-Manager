import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { editBudget } from '../../api/api'
import { triggerToast } from '../../utils/notification'
import ModalParent from './ModalParent'

export default function EditBudgetModal (props: {
  open: boolean
  toogleOpen: (open: boolean) => void
  editBudget: (budget: number) => void
}): JSX.Element {
  const [budget, setBudget] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleBudgetChange = (e: any): void => {
    setBudget(e.target.value)
  }

  const handleSubmit = async (): Promise<void> => {
    setLoading(true)

    if (budget <= 0) {
      setLoading(false)
      triggerToast('error', 'Budget must be greater than 0!')
      return
    }

    try {
      await editBudget(budget)
      props.editBudget(budget)
      setLoading(false)
      triggerToast('success', 'Budget edited succesfully!')
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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    handleSubmit={handleSubmit}>
      <Form as={Row} className='justify-content-center'>
        <Form.Group as={Col} xs={6} className="mb-3">
          <Form.Label>New Budget</Form.Label>
          <Form.Control
          required
          type="number"
          placeholder="Enter budget in rupees"
          onChange={handleBudgetChange}
          />
          </Form.Group>
      </Form>
    </ModalParent>
  )
}
