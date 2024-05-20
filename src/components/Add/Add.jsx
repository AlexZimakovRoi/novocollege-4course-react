import { collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { useState } from "react"
import { auth, db } from "../../services/firebase/config"
import { user } from "../../services/store/user"

export const Add = () => {

    const [isLoad, setIsLoad] = useState(true)
    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [filterState, setFilterState] = useState('all')

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

    const DeleteTraining = async (id) => {
        const deleteTrainingArr = []
        user.data.el.training.map((data, i) => {
            if (id != i) {
                deleteTrainingArr.push(data)
            }
        })

        const updateRef = doc(db, "users", user.data.id);
        await updateDoc(updateRef, {
            training: deleteTrainingArr
        }).then(() => {
            revUserStore()
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
        <h1>Добавить тренировку</h1>

        <input onInput={(e) => setName(e.target.value)} value={name} type="text" placeholder="название" />
        <input onInput={(e) => setTime(e.target.value)} value={time} type="text" placeholder="Время тренировки" />
        <input onChange={(e) => setDate(e.target.value)} type="date" placeholder="Дата тренировки" />
        <button onClick={UpdateTraining}>Добавить</button>

        <p>Количество тренировок - {user.data.el.training.length}</p>
        <nav style={{display: 'flex', gap: '2vw'}}>
            <button onClick={() => setFilterState('all')}>All</button>
            <button onClick={() => setFilterState('done')}>Done</button>
            <button onClick={() => setFilterState('active')}>Active</button>
        </nav>
        {
            isLoad == true ? (
                <>
                    {
                        filterState == 'all' ? (
                            <div>
                                {
                                    user.data.el.training.map((data, i) => (
                                        <li key={i}>
                                            <h1>name - {data.name}</h1>
                                            <p>time - {data.time}</p>
                                            <button onClick={() => DeleteTraining(i)}>Delete</button>
                                        </li>
                                    ))
                                }
                            </div>
                        ) : ''
                    }
                    {
                        filterState == 'done' ? (
                            <div>
                                {
                                    user.data.el.training.map((data, i) => data.done == true ? (
                                        <li key={i}>
                                            <h1>name - {data.name}</h1>
                                            <p>time - {data.time}</p>
                                            <button onClick={() => DeleteTraining(i)}>Delete</button>
                                        </li>
                                    ) : '')
                                }
                            </div>
                        ) : ''
                    }
                    {
                        filterState == 'active' ? (
                            <div>
                                {
                                    user.data.el.training.map((data, i) => data.done == false ? (
                                        <li key={i}>
                                            <h1>name - {data.name}</h1>
                                            <p>time - {data.time}</p>
                                            <button onClick={() => DeleteTraining(i)}>Delete</button>
                                        </li>
                                    ) : "")
                                }
                            </div>
                        ) : ''
                    }
                </>
                
            ) : (
                <h1>load</h1>
            )
        }
    </div>
  )
}
