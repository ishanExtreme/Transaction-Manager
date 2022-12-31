/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'
import { Card } from 'react-bootstrap'
import IconButton from '../common/IconButton'
import { HiOutlineCurrencyRupee, HiOutlinePencilSquare } from 'react-icons/hi2'

export default function BudgetLayer (props: {
  username: string
  budget: number
  owed: number
  owe: number
  editBudget: (budget: number) => void
}) {
  return (
    <Card style={{ width: '25rem' }} className="text-center">
      <Card.Body>
        <Card.Title>Hey, {props.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Your Budget Details</Card.Subtitle>
        <Card.Text>

          <div className='mb-3'>
            {props.budget > 0
              ? <p className="fw-bold text-info">Your Remaining Budget: ₹{props.budget}</p>
              : <p className="fw-bold text-warning">Your Remaining Budget: ₹{props.budget}</p>
            }
            <IconButton variant='warning' text='Edit Budget'>
              <HiOutlinePencilSquare/>
            </IconButton>
          </div>

          <p className="fw-light text-success">Your are owed: +₹{props.owed}</p>
          <p className="fw-light text-danger">Your owe: -₹{props.owe}</p>
        </Card.Text>

        <IconButton variant='primary' text="Add Transaction">
          <HiOutlineCurrencyRupee/>
        </IconButton>

      </Card.Body>
    </Card>
  )
}
