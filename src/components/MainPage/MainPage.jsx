import { user } from "../../services/store/user"

export const MainPage = () => {


  return (
    <main className="main">
        <h1>email - {user.data.el.email}</h1>
        <p>Количество тренировок - {user.data.el.training.length}</p>
    </main>
  )
}
