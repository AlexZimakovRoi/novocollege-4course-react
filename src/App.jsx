import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavBar } from "./components/NavBar/NavBar"
import { MainPage } from "./components/MainPage/MainPage"
import './reset.css'
import { Auth } from "./components/Auth/Auth"
import { Settings } from "./components/Settings/Settings"
import { Redirect } from "./components/Redirect/Redirect"
import { SetUser } from "./components/SetUser/SetUser"
import { Add } from "./components/Add/Add"
import { Stat } from "./components/Stat/Stat"

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route index Component={SetUser} />
          <Route path="/main" Component={MainPage} />
          <Route path="/add" Component={Add} />
          <Route path="/stat" Component={Stat} />
          <Route path="/register" Component={Auth} />
          <Route path="/settings" Component={Settings} />
          <Route path="/redirect" Component={Redirect} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
