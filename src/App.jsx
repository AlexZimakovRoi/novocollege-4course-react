import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { NavBar } from "./components/NavBar/NavBar"
import { MainPage } from "./components/MainPage/MainPage"
import './reset.css'
import { Loader } from "./components/Loader/Loader"
import { useState } from "react"
import { auth } from "./services/firebase/config"
import { Auth } from "./components/Auth/Auth"
import { Settings } from "./components/Settings/Settings"
import { Redirect } from "./components/Redirect/Redirect"

function App() {
  const [isLoad, setIsLoad] = useState(false)
  const [isUser, setIsUser] = useState()

  setTimeout(() => {
    setIsLoad(true)
    if (auth.currentUser == null) {
      setIsUser(false)
    } else {
      setIsUser(true)
    }
  }, 3500)
  
  return (
    <>
      <BrowserRouter>
        {
          isLoad ? '' : (
            <Loader />
          ) 
        }
        <NavBar />
        <Routes>
          <Route index Component={MainPage} />
          <Route path="/register" Component={Auth} />
          <Route path="/settings" Component={Settings} />
          <Route path="/redirect" Component={Redirect} />
        </Routes>

        {
          isUser == false ? (
            <Navigate to={'/register'} />
          ) : ''
        }
      </BrowserRouter>
    </>
  )
}

export default App
