import React from "react";
import { User } from "../types/users";

export default function Dashboard(props:{user:User}) {

  return (
    <p>{props.user?.username}</p>
  )

}