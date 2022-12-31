
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import IconButton from '../common/IconButton'
import { HiOutlineCurrencyRupee, HiOutlinePencilSquare } from 'react-icons/hi2'

const calRemainingBudget = (budget: number, moneySpent: number): number => {
  return budget - moneySpent
}

export default function BudgetLayer (props: {
  username: string
  budget: number
  owed: number
  owe: number
  moneySpent: number
  editBudget: (budget: number) => void
  handleClick: (open: boolean) => void
  toogleAddTransactionModal: (open: boolean) => void
}) {
  const [remainingBudget, setRemainingBudget] = useState(calRemainingBudget(props.budget, props.moneySpent))

  useEffect(() => {
    setRemainingBudget(calRemainingBudget(props.budget, props.moneySpent))
  }, [props.budget])

  return (
    <Card style={{ width: '25rem' }} className="text-center">
      <Card.Body>
        <Card.Title>Hey, {props.username}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Your Budget Details</Card.Subtitle>
        <Card.Text>

          <div className='mb-3'>
            {remainingBudget > 0
              ? <p className="fw-bold text-info">Your Remaining Budget: ₹{remainingBudget}</p>
              : <p className="fw-bold text-warning">Your Remaining Budget: ₹{remainingBudget}</p>
            }
            <IconButton variant='warning' text='Edit Budget' onClick={() => props.handleClick(true)}>
              <HiOutlinePencilSquare/>
            </IconButton>
          </div>

          <p className="fw-light text-success">Your are owed: +₹{props.owed}</p>
          <p className="fw-light text-danger">You owe: -₹{props.owe}</p>
        </Card.Text>

        <IconButton onClick={() => props.toogleAddTransactionModal(true)} variant='primary' text="Add Transaction">
          <HiOutlineCurrencyRupee/>
        </IconButton>

      </Card.Body>
    </Card>
  )
}
