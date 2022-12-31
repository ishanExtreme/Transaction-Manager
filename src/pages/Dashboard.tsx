/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import { Friend, Friends, User } from '../types/users'
import { HiOutlineUserPlus, HiOutlineUserGroup } from 'react-icons/hi2'
import { ButtonGroup, Col, Row } from 'react-bootstrap'
import IconButton from '../components/common/IconButton'
import AddFriendModal from '../components/modals/AddFriendModal'
import { listFriends } from '../api/api'
import ListFriendModal from '../components/modals/ListFriendsModal'
import BudgetLayer from '../components/Dashboard/BudgetLayer'
import EditBudgetModal from '../components/modals/EditBudgetModal'

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

export default function Dashboard (props: { user: User }) {
  const [openAddFriendModel, setOpenAddFriendModal] = useState(false)
  const [openListFriendModal, setOpenListFriendModal] = useState(false)
  const [openEditBudgetModal, setOpenEditBudgetModal] = useState(false)

  const [friendsLoading, setFriendsLoading] = useState(false)
  const [friends, setFriends] = useState<Friends>([])

  const [budget, setBudget] = useState((props.user != null) ? props.user.budget : 0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [moneySpent, setMoneySpent] = useState((props.user != null) ? props.user.money_spent : 0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [owe, setOwe] = useState((props.user != null) ? props.user.owe : 0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [owed, setOwed] = useState((props.user != null) ? props.user.owed : 0)

  useEffect(() => {
    void getFriendListFromApi(setFriendsLoading, setFriends)
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
        />
      </Col>
      <Col xs={12}>
        <ButtonGroup>
          <IconButton text="Add Friends" onClick={() => toogleAddFriendModal(true)} >
            <HiOutlineUserPlus />
          </IconButton>

          <IconButton text="Show Friends" onClick={() => toogleListFriendModal(true)} >
            <HiOutlineUserGroup />
          </IconButton>
        </ButtonGroup>
      </Col>
    </Row>
    </>
  )
}
