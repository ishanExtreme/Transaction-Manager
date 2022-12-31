/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react'
import { me } from './api/api'
import AppContainer from './components/common/AppContainer'
import AppRouterPrivate from './routes/AppRouterPrivate'
import AppRouterPublic from './routes/AppRouterPublic'
// import AppRouterPrivate from './routes/AppRouterPrivate';
import { User } from './types/users'

const getCurrentUser = async (
  setCurrentUser: (user: User) => void,
  setLoading: (load: boolean) => void) => {
  setLoading(true)
  let currtUser: any = null
  try {
    currtUser = await me()
  } catch (error) {
    console.log(error)
  }

  if (currtUser == null) { setCurrentUser(null) } else { setCurrentUser(currtUser[0]) }
  setLoading(false)
}

function App () {
  const [currentUser, setCurrentUser] = useState<User>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    void getCurrentUser(setCurrentUser, setLoading)
  }, [])

  return (
    loading

      ? <AppContainer >
      <div className="flex flex-row justify-center w-full items-center mt-3 mb-3">
          <div className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0" role="status">
              <span className="visually-hidden">Loading...</span>
          </div>
      </div>
    </AppContainer>

      : (currentUser != null)
          ? <AppRouterPrivate currentUser={currentUser}/>
          : <AppRouterPublic />
  )
}

export default App
