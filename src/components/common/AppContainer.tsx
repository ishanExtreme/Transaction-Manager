
import React from 'react'
import { ToastContainer } from 'react-toastify'
import Container from 'react-bootstrap/Container'

export default function AppContainer (props: { children: React.ReactNode }) {
  return (
        <>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />

        <Container className="p-5" fluid style={{ height: '100vh' }}>
            {props.children}
        </Container>
        </>

  )
}
