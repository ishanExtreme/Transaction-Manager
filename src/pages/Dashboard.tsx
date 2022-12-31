/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import { Friend, Friends, User } from '../types/users'
import { HiOutlineUserPlus, HiOutlineUserGroup, HiOutlineMagnifyingGlass, HiOutlineXCircle, HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2'
import { Button, ButtonGroup, Col, Form, InputGroup, Row } from 'react-bootstrap'
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
import { triggerToast } from '../utils/notification'
import { navigate } from 'raviger'

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
  setTransactions: (transactions: Transaction[]) => void,
  filter?: { date: string, category: string }
) => {
  setLoading(true)

  let transactions = null
  try {
    transactions = await getTransactions(filter)
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

  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value)
  }

  const handleDateChange = (e: any) => {
    setDate(e.target.value)
  }

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

  const handleSearch = async () => {
    await getTransactionsFromApi(setTransactionLoading, setTransactions, { date: '', category: search })

    triggerToast('success', 'Transactions Filtered')

    setSearch('')
  }

  const handleDateSearch = async () => {
    await getTransactionsFromApi(setTransactionLoading, setTransactions, { date, category: '' })

    triggerToast('success', 'Transactions Filtered')

    setDate('')
  }

  const hanleClearFilter = async () => {
    await getTransactionsFromApi(setTransactionLoading, setTransactions)

    triggerToast('success', 'Filters Cleared')

    setSearch('')
    setDate('')
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }

  return (
    <>
    <AddFriendModal open={openAddFriendModel} toogleOpen={toogleAddFriendModal} addFriend={addFriend}/>
    <ListFriendModal friends={friends} loading={friendsLoading} open={openListFriendModal} toogleOpen={toogleListFriendModal} />
    <EditBudgetModal editBudget={editBudget} open={openEditBudgetModal} toogleOpen={toogleEditBudgetModal} />
    <AddTransactionModal friends={friends} open={openAddTransactionModal} toogleOpen={toogleAddTransactionModal} />

    <Row >
      <Col xs={6} className="mb-3 text-center">
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

      <Col xs={6}>
        <IconButton variant='danger' text="Logout" onClick={logout}>
          <HiOutlineArrowLeftOnRectangle />
        </IconButton>
      </Col>

      <Col xs={8}>
        <Row>
          <Col xs={4}>
            <InputGroup >
            <Form.Control
              placeholder="Search by category"
              onChange={handleSearchChange}
              value={search}
            />
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <Button onClick={handleSearch} variant="outline-secondary">
              Search
            </Button>
          </InputGroup>
          </Col>

          <Col xs={4}>
            <Row>
              <Col xs={10}>
              <Form.Control
                  type="date"
                  value={date}
                  onChange={handleDateChange}
              />
              </Col>
              <Col xs={2}>
              <ButtonGroup>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <IconButton variant='warning' text="" onClick={handleDateSearch}>
                  <HiOutlineMagnifyingGlass />
                </IconButton>
                {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                <IconButton variant='warning' text="" onClick={hanleClearFilter}>
                  <HiOutlineXCircle />
                </IconButton>
              </ButtonGroup>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>

      <Col xs={4}>
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
          <Col key={idx} className="mb-3">
            <TransactionCard amount={transaction.amount} category={transaction.category} involved_users={transaction.involved_users} name={transaction.name} non_members={transaction.non_members} />
          </Col>
      ))}

    </Row>
  }
    </>
  )
}
