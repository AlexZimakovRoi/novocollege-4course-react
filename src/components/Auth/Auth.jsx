import { createUserWithEmailAndPassword } from 'firebase/auth'
import './Auth.css'
import { auth } from '../../services/firebase/config'
import { useState } from 'react'

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const RegisterUser = () => {
        if (pass == confirmPass) {
            createUserWithEmailAndPassword(auth, email, pass).then(() => {
                console.log('create user')
            }).catch(() => { console.log('err') })
        }
    }

  return (
    <main className="auth">
        <h1>Регистрация</h1>
        <input onInput={(e) => setEmail(e.target.value)} type="text" placeholder='email' />
        <input onInput={(e) => setPass(e.target.value)} type="password" placeholder='pass' />
        <input onInput={(e) => setConfirmPass(e.target.value)} type="password" placeholder='confirm pass' />
        <button onClick={RegisterUser}>Новый пользователь</button>
    </main>
  )
}
