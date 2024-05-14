import { useState } from 'react'
import './Redirect.css'
import { Navigate } from 'react-router-dom'

export const Redirect = () => {

    const [redirect, setRedirect] = useState()

    setTimeout(() => {
        setRedirect(true)
    }, 2500)

  return (
    <main
    style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        background: '#111111',
        left: '0',
        top: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}
    >
        redirect

        {
            redirect == true ? (
                <Navigate to={'/'} />
            ) : ''
        }
    </main>
  )
}
