import { NavLink } from "react-router-dom"
import './NavBar.css'

export const NavBar = () => {
  return (
    <nav className="nav">
        <a href="">Name app</a>
        <ol className="nav-container">
            <NavLink to={'/'}>Главная</NavLink>
            <NavLink to={'/add'}>Добавить</NavLink>
            <NavLink to={'/stat'}>Учет</NavLink>
            <NavLink to={'/settings'}>Настройки</NavLink>
        </ol>
    </nav>
  )
}