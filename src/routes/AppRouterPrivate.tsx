import React from 'react';
import {useRoutes} from 'raviger'
import { User } from '../types/users';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import AppContainer from '../components/common/AppContainer';

const Privateroutes = {
    '/': ({user}:{user?:User})=><Dashboard user={user?user:null} />,
    '/register': ({user}:{user?:User})=> <Register user={user}/>,
    '/login': ({user}:{user?:User})=><Login user={user}/>,
    '/dashboard': ({user}:{user?:User})=><Dashboard user={user?user:null} />,
}

export default function AppRouterPrivate(props:{currentUser:User}) {

    // Private routes
    const routeResult = useRoutes(Privateroutes, { routeProps: { user: props.currentUser } });
    
    return <AppContainer>{routeResult}</AppContainer>;
}