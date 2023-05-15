import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import * as authService from "../../../services/authService"

const UserDetails = () => {
  const { user, authEdit, userRemove } = useContext(AuthContext);
  const navigate = useNavigate();

  let img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU';

  const onClick = (e) => {
    e.preventDefault();
    navigate(`/jsonstore/${user._id}/edit`);
  };

  const userDelete = (e) => {
    e.preventDefault();
    
    const confirmation = window.confirm('Наистина ли искате да изтриете профила си?');
    
    if (confirmation){
      authService.remove(user._id);
    }
  };

  return (
    <div className="user__details">
      <form  action="">
        <img
        // src="https://woman.bg/static/uploads/content/39/b73daf9413b5f7ab4375270508164976.jpg"
        src={
          authEdit.img === '' || authEdit.img === undefined
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU"
            : authEdit.img
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
              <li>{authEdit.family}</li>
              <li>{user.email}</li>
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
              <li>{authEdit.number}</li>
              <li>{authEdit.img === '' || authEdit.img === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU' ? '' : authEdit.img }</li>
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
