import React, { useEffect, useState } from "react";
import { Friend, Friends, User } from "../types/users";
import { HiOutlineUserPlus, HiOutlineUserGroup } from "react-icons/hi2";
import { ButtonGroup, Col, Row } from "react-bootstrap";
import IconButton from "../components/common/IconButton";
import AddFriendModal from "../components/modals/AddFriendModal";
import { listFriends } from "../api/api";
import ListFriendModal from "../components/modals/ListFriendsModal";

const getFriendListFromApi = async (
setLoading: (loading:boolean)=>void,
setFriends: (friends:Friends)=>void
)=>{
  setLoading(true);

  let friends = null
  try{
    friends = await listFriends()
  }
  catch(error)
  {
    setLoading(false)
    return;
  }

  setFriends(friends[0].friends)
  setLoading(false)
}

export default function Dashboard(props:{user:User}) {
  const [openAddFriendModel, setOpenAddFriendModal] = useState(false)
  const [openListFriendModal, setOpenListFriendModal] = useState(false)

  const [friendsLoading, setFriendsLoading] = useState(false)
  const [friends, setFriends] = useState<Friends>([])

  useEffect(()=>{
    getFriendListFromApi(setFriendsLoading, setFriends);
  },[])

  const toogleAddFriendModal = (open:boolean)=>{
    setOpenAddFriendModal(open)
  }
  const toogleListFriendModal = (open:boolean)=>{
    setOpenListFriendModal(open)
  }

  const addFriend = (friend: Friend)=>{

    const dublicate = friends.filter((curr_friend)=> friend.username === curr_friend.username)

    if(dublicate.length === 0)
      setFriends((friends)=> [...friends, friend])
  }

  return (
    <>
    <AddFriendModal open={openAddFriendModel} toogleOpen={toogleAddFriendModal} addFriend={addFriend}/>
    <ListFriendModal friends={friends} loading={friendsLoading} open={openListFriendModal} toogleOpen={toogleListFriendModal} />

    <Row>
      <Col>
        <ButtonGroup>
          <IconButton text="Add Friends" onClick={()=>toogleAddFriendModal(true)} >
            <HiOutlineUserPlus />
          </IconButton>

          <IconButton text="Show Friends" onClick={()=>toogleListFriendModal(true)} >
            <HiOutlineUserGroup />
          </IconButton>
        </ButtonGroup>
      </Col>
    </Row>
    </>
  )

}