import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import './Auth.css'
import { auth, db } from '../../services/firebase/config'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { addDoc, collection } from 'firebase/firestore'

export const Auth = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [redirect, setRedirect] = useState(false)

    const RegisterUser = () => {
        if (pass == confirmPass) {
            createUserWithEmailAndPassword(auth, email, pass).then(() => {
                CreateDBUser().then(() => {
                    setRedirect(true)
                })
            }).catch(() => { console.log('err') })
        }
    }

    const CreateDBUser = async () => {
        try {
            const userRef = await addDoc(collection(db, "users"), {
                email: email,
                training: []
            });
            console.log("Document written with ID: ", userRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const [userEmail, setUserEmail] = useState('')
    const [userPass, setUserPass] = useState('')

    const SignIn = () => {
        signInWithEmailAndPassword(auth, userEmail, userPass)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            setRedirect(true)
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage)
          });
    }

  return (
    <main className="auth">
        <div>    
            <h1>Регистрация</h1>
            <input onInput={(e) => setEmail(e.target.value)} type="text" placeholder='email' />
            <input onInput={(e) => setPass(e.target.value)} type="password" placeholder='pass' />
            <input onInput={(e) => setConfirmPass(e.target.value)} type="password" placeholder='confirm pass' />
            <button onClick={RegisterUser}>Новый пользователь</button>
            {
                redirect == true ? (
                    <Navigate to={'/'} />
                ) : ""
            }
        </div>
        <div>
            <h1>Вход</h1>
            <input onInput={(e) => setUserEmail(e.target.value)} type="text" placeholder='email' />
            <input onInput={(e) => setUserPass(e.target.value)} type="password" placeholder='pass' />
            <button onClick={SignIn}>Вход</button>
        </div>
    </main>
  )
}
