import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
import * as authService from "../../../services/authService";
import CreateUserData from "../CreateUser/CreateUserData";

const UserDetails = ({ userEdit }) => {
  const { user, authEdit } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState([]);
  const navigate = useNavigate();

  const img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU';

  async function userDetails(userId) {
    try {
      const res = await axios.post("http://localhost:5000/api/user/get", {
        userId,
      }).then((data) => {
        console.log(data.data);
        setCurrentUser(data.data);
        return data.data;
      }).catch((err) => toast.error(err.response.data));
    } catch (err) {
      toast.error(err.response);
    }
  };

  // useEffect(()=> {
  //   if(authEdit.length === 0){
  //     console.log(currentUser);

  //   };
  // },[]);

  const onClick = (e) => {
    e.preventDefault();
    <CreateUserData userEdit={userEdit} />
    navigate(`/users/${user.id}/edit`);
  };

  const userDelete = (e) => {
    e.preventDefault();

    const confirmation = window.confirm('Наистина ли искате да изтриете профила си?');

    if (confirmation) {
      authService.remove(user._id);
    }
  };

  return (
    <div className="user__details">
      <form action="">
        <img
          // src="https://woman.bg/static/uploads/content/39/b73daf9413b5f7ab4375270508164976.jpg"
          src={
            authEdit.picture === '' ||
              authEdit.picture === undefined ||
              authEdit.picture === img
              ? img
              : authEdit.picture
          }
          alt="user-picture2"
        />
        <div className="user__details-info">
          <div className="user__details-info-personal">
            <ul className="personal-title">
              <li>Име: </li>
              <li>Фамилия: </li>
              <li>Имейл: </li>
              <li>Телефон: </li>
            </ul>
            <ul className="personal-data">
              <li>{authEdit.name}</li>
              <li>{authEdit.family_name}</li>
              <li>{authEdit.email}</li>
              <li>{authEdit.phone}</li>
            </ul>
          </div>
          <div className="user__details-info-address">
            <ul className="address-title">
              <li>Град:</li>
              <li>Улица:</li>
              <li>Номер:</li>
              <li>Снимка:</li>
            </ul>
            <ul className="address-data">
              <li>{authEdit.city}</li>
              <li>{authEdit.street}</li>
              <li>{authEdit.street_number}</li>
              <li>{authEdit.picture === '' || authEdit.picture === img ? '' : authEdit.picture}</li>
            </ul>
          </div>
        </div>

        <div className="user__details-buttons">
          <button className="btn-edit" onClick={onClick}>
            промени
          </button>
          <button className="btn-delete" onClick={userDelete}>изтрий</button>
        </div>
      </form>
    </div>
  );
};

export default UserDetails;
