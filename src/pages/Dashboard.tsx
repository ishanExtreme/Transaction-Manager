/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import { Friend, Friends, User } from '../types/users'
import { HiOutlineUserPlus, HiOutlineUserGroup } from 'react-icons/hi2'
import { ButtonGroup, Col, Row } from 'react-bootstrap'
import IconButton from '../components/common/IconButton'
import AddFriendModal from '../components/modals/AddFriendModal'
import { getTransactions, listFriends } from '../api/api'
import ListFriendModal from '../components/modals/ListFriendsModal'
import BudgetLayer from '../components/Dashboard/BudgetLayer'
import EditBudgetModal from '../components/modals/EditBudgetModal'
import AddTransactionModal from '../components/modals/AddTransactionModal'
import { Transaction } from '../types/transaction'
import TransactionCard from '../components/Dashboard/TransactionCard'
import Loading from '../components/common/Loading'

const getFriendListFromApi = async (
  setLoading: (loading: boolean) => void,
  setFriends: (friends: Friends) => void
) => {
  setLoading(true)

  let friends = null
  try {
    friends = await listFriends()
  } catch (error) {
    setLoading(false)
    return
  }

  setFriends(friends[0].friends)
  setLoading(false)
}

const getTransactionsFromApi = async (
  setLoading: (loading: boolean) => void,
  setTransactions: (transactions: Transaction[]) => void
) => {
  setLoading(true)

  let transactions = null
  try {
    transactions = await getTransactions()
  } catch (error) {
    setLoading(false)
    return
  }

  setTransactions(transactions)
  setLoading(false)
}

export default function Dashboard (props: { user: User }) {
  const [openAddFriendModel, setOpenAddFriendModal] = useState(false)
  const [openListFriendModal, setOpenListFriendModal] = useState(false)
  const [openEditBudgetModal, setOpenEditBudgetModal] = useState(false)
  const [openAddTransactionModal, setOpenAddTransactionModal] = useState(false)

  const [friendsLoading, setFriendsLoading] = useState(false)
  const [friends, setFriends] = useState<Friends>([])

  const [transactionLoading, setTransactionLoading] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [budget, setBudget] = useState((props.user != null) ? props.user.budget : 0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [moneySpent, setMoneySpent] = useState((props.user != null) ? props.user.money_spent : 0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [owe, setOwe] = useState((props.user != null) ? props.user.owe : 0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [owed, setOwed] = useState((props.user != null) ? props.user.owed : 0)

  useEffect(() => {
    void getFriendListFromApi(setFriendsLoading, setFriends)
    void getTransactionsFromApi(setTransactionLoading, setTransactions)
  }, [])

  const toogleAddFriendModal = (open: boolean) => {
    setOpenAddFriendModal(open)
  }
  const toogleListFriendModal = (open: boolean) => {
    setOpenListFriendModal(open)
  }
  const toogleEditBudgetModal = (open: boolean) => {
    setOpenEditBudgetModal(open)
  }
  const toogleAddTransactionModal = (open: boolean) => {
    setOpenAddTransactionModal(open)
  }

  const addFriend = (friend: Friend) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const dublicate = friends.filter((curr_friend) => friend.username === curr_friend.username)

    if (dublicate.length === 0) { setFriends((friends) => [...friends, friend]) }
  }

  const editBudget = (budget: number) => {
    setBudget(budget)
  }

  return (
    <>
    <AddFriendModal open={openAddFriendModel} toogleOpen={toogleAddFriendModal} addFriend={addFriend}/>
    <ListFriendModal friends={friends} loading={friendsLoading} open={openListFriendModal} toogleOpen={toogleListFriendModal} />
    <EditBudgetModal editBudget={editBudget} open={openEditBudgetModal} toogleOpen={toogleEditBudgetModal} />
    <AddTransactionModal friends={friends} open={openAddTransactionModal} toogleOpen={toogleAddTransactionModal} />

    <Row>
      <Col xs={3} className="mb-3">
        <BudgetLayer
        budget={budget}
        owe={owe}
        owed={owed}
        username={(props.user != null) ? props.user.username : ''}
        editBudget={editBudget}
        handleClick={toogleEditBudgetModal}
        moneySpent={moneySpent}
        toogleAddTransactionModal={toogleAddTransactionModal}
        />
      </Col>
      <Col xs={12}>
        <ButtonGroup>
          <IconButton variant='info' text="Add Friends" onClick={() => toogleAddFriendModal(true)} >
            <HiOutlineUserPlus />
          </IconButton>

          <IconButton variant='info' text="Show Friends" onClick={() => toogleListFriendModal(true)} >
            <HiOutlineUserGroup />
          </IconButton>
        </ButtonGroup>
      </Col>
    </Row>

    {transactionLoading
      ? <Loading/>
      : <Row xs="auto" className='mt-3'>
      {transactions.map((transaction, idx) => (
          <Col key={idx} xs={3}>
            <TransactionCard amount={transaction.amount} category={transaction.category} involved_users={transaction.involved_users} name={transaction.name} non_members={transaction.non_members} />
          </Col>
      ))}

    </Row>
  }
    </>
  )
}
