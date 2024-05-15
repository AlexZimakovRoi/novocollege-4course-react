import { signOut } from "firebase/auth"
import { auth } from "../../services/firebase/config"
import { useState } from "react"
import { Navigate } from "react-router-dom"

export const Settings = () => {
    const [redirect, setRedirect] = useState(false)

    const SignOut = () => {
        signOut(auth).then(() => { setRedirect(true) })
    }

  return (
    <main>
        <button onClick={SignOut}>Sign out</button>

        {
            redirect == true ? (
                <Navigate to={'/'} />
            ) : ''
        }
    </main>
  )
}
