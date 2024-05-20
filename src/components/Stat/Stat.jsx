import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { useState } from "react"
import { auth, db } from "../../services/firebase/config"
import { user } from "../../services/store/user"

export const Stat = () => {

    const [isLoad, setIsLoad] = useState(true)
    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')

    const UpdateTraining = async () => {
        const updTrainingArr = user.data.el.training
        await updTrainingArr.push({name: name, time: time, date: date, done: false})

        const updateRef = doc(db, "users", user.data.id);
        await updateDoc(updateRef, {
            training: updTrainingArr
        }).then(() => {
            setName('')
            setTime('')
        })
    }

    const UpdateDone = async (id) => {
        const updateArr = []
        user.data.el.training.map((data, i) => {
            if (id == i) {
                data.done = true;
            }
            updateArr.push(data)
        })
        console.log(updateArr)
        const updateRef = doc(db, "users", user.data.id);

        await updateDoc(updateRef, {
            training: updateArr
        }).then(() => {
            revUserStore()
        }).catch(() => {
            console.log('err')
        })

    }

    const revUserStore = async () => {
        await setIsLoad(false)
        const queryRef = query(collection(db, "users"), where("email", "==", auth.currentUser.email));
      
        const getUserRef = await getDocs(queryRef);
        await getUserRef.forEach((doc) => {
            user.data = {
                el: doc.data(),
                id: doc.id
            }
          console.log(doc.id, " => ", doc.data());
        });

        await setIsLoad(true)
    }

  return (
    <div>
        <p>Количество тренировок - {user.data.el.training.length}</p>
        {
            isLoad == true ? (
                <div>
                    {
                        user.data.el.training.map((data, i) => 
                            data.done == false ? (
                            <li key={i}>
                                <h1>name - {data.name}</h1>
                                <p>time - {data.time}</p>
                                <button onClick={() => UpdateDone(i)}>Done</button>
                            </li>
                        ) : '' )
                    }
                </div>
            ) : (
                <h1>load</h1>
            )
        }
    </div>
  )
}