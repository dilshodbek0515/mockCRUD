import React, { useState } from 'react'
import "./Users.css"
import male from "../../assets/male-avatar-boy-face-man-user-9.svg"
import female from "../../assets/female-avatar-girl-face-woman-user-2.svg"
import { useDispatch } from 'react-redux'
import { removeFromUsers, updateUser } from "../../context/usersSlice"
import Model from '../model/Model'
function Users({ data }) {
  const dispatch = useDispatch()
  const [modelOpen, setModelOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  const open = (user) => {
    setEdit(user);
    setModelOpen(true);
  };

  const closed = () => {
    setModelOpen(false);
    setEdit(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const saveChange = (e) => {
    dispatch(updateUser(edit));
    closed()

  }
  return (
    <div className='users__wrapper'>
      {
        data?.map((user) =>
          <div key={user.id} className="users__card">
            <img src={user.gander === "male" ? male : female} alt="user" />
            <h2>{user.name}</h2>
            <p>{user.profession}</p>
            <p>{user.age} years old</p>
            <div className='bottom_btn'>
              <button onClick={() => dispatch(removeFromUsers(user))}>Remove</button>
              <button
                onClick={() => open(user)}
              >
                Edit
              </button>
            </div>
          </div>
        )
      }
      {modelOpen && (
        <Model closed={closed}>
          <div className="modal_collection">

            <label>
               <input
                type="text"
                name='name'
                value={edit?.name || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              <input
                type="text"
                name='profession'
                value={edit?.profession || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              <input
                type="number"
                name='age'
                value={edit?.age || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              <select
                name="gander"
                value={edit?.gander || ""}
                onChange={handleChange}
              >
                <option value="">gender</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </label>

            <button onClick={saveChange}>Save</button>
            <button onClick={closed}>Close</button>
          </div>
        </Model>
      )}
    </div>
  )
}

export default Users