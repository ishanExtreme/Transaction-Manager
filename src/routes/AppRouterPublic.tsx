import React from 'react'
import { useRoutes } from 'raviger'
import AppContainer from '../components/common/AppContainer'
import Register from '../pages/Register'
import Signin from '../pages/Login'

const Publicroutes = {
  '/': () => <Signin user={null}/>,
  '/register': () => <Register user={null}/>,
  '/login': () => <Signin user={null}/>
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function AppRouterPublic () {
  // Public routes
  const routeResult = useRoutes(Publicroutes)

  return <AppContainer>{routeResult}</AppContainer>
}
