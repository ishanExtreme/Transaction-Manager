import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { addFriend } from "../../api/api";
import { Friend } from "../../types/users";
import { triggerToast } from "../../utils/notification";
import ModalParent from "./ModalParent";

export default function AddFriendModal(props:{
  open:boolean
  toogleOpen: (open:boolean)=>void
  addFriend: (friend: Friend)=>void
}) {

  const [username, setUserName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUserNameChange = (e:any)=>{
    setUserName(e.target.value)
  }

  const handleSubmit = async ()=>{

    setLoading(true)

    try{
      await addFriend(username)
      props.addFriend({username})
      setLoading(false)
      triggerToast("success", "Friend added succesfully!")
    }
    catch(error)
    {
      setLoading(false)
    }


  }

  return (
    <ModalParent 
    open={props.open} 
    title="Add Friend" 
    toogleOpen={props.toogleOpen} 
    loading={loading} 
    handleSubmit={handleSubmit}>
      <Form as={Row} className='justify-content-center'>
        <Form.Group as={Col} xs={6} className="mb-3" controlId="formBasicEmail">
          <Form.Label>Firend's Username</Form.Label>
          <Form.Control 
          required 
          type="text" 
          placeholder="Enter friend's username" 
          onChange={handleUserNameChange}
          />
          </Form.Group>
      </Form>
    </ModalParent>
  )
}