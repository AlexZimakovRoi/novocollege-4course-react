import { Navigate } from "react-router-dom"
import { Loader } from "../Loader/Loader"
import { auth, db } from "../../services/firebase/config"
import { useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { user } from "../../services/store/user"

export const SetUser = () => {

    const [isLoad, setIsLoad] = useState(false)
    const [isUser, setIsUser] = useState()


    const setUserStore = async () => {
        const queryRef = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
      
        const getUserRef = await getDocs(queryRef);
        await getUserRef.forEach((doc) => {
            user.data = {
                el: doc.data(),
                id: doc.id
            }
          console.log(doc.id, " => ", doc.data());
        });
        await setIsUser(true)
    }

    setTimeout(() => {
        setIsLoad(true)
        if (auth.currentUser == null) {
        setIsUser(false)
        } else {
            setUserStore()
        }
    }, 3500)

  return (
    <>
        {
          isLoad ? '' : (
            <Loader />
          ) 
        }
        <div>SetUser</div>
        {
          isUser == false ? (
            <Navigate to={'/register'} />
          ) : ''
        }
        {
            isUser == true ? (
                <Navigate to={'/main'} />
            ) : ''
        }
    </>
  )
}
