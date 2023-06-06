import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";

const CreateUserData = () => {
  const { user, authEdit, setAuthEdit } = useContext(AuthContext);
  const navigate = useNavigate();
  const userId = user.id;
  let image = '';

  async function updateUserDetails(userData) {

    try {
      const res = await axios.post("http://localhost:5000/api/user/update", { userData })
        .then((data) => {
          // const product = data.data[0];
          // console.log(data.data);
          return data.data;
        })
        .catch((error) => console.log(error));
        // console.log(res);
    } catch (err) {
      toast.error(err.response);
    }
  };

  useEffect(() => {
    // updateUserDetails(getUserData);
    // console.log(getUserData);
  },[authEdit]);

  const getUserData = (e) => {
    e.preventDefault();

    const form = document.querySelector(".form");
    const submitter = document.querySelector(".btn-edit");

    // console.log(submitter);

    let userData = Object.fromEntries(new FormData(form, submitter));

    if (user.picture === "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU" || user.picture === undefined) {
      image = '';
    } else {
      image = user.picture;
    };

    userData.id = userId;
    setAuthEdit(userData);
    // console.log(userData);
    updateUserDetails(userData);
    navigate(`/users/${user.id}`);
    return userData;
  };

  // updateUserDetails(authEdit);


// console.log(authEdit);
  // updateUserDetails(user);
  // updateUserDetails(getUserData);

  return (
    <div className="user__details-edit">
      <form action="" className="form" onSubmit={getUserData}>
        <img
          src={
            authEdit.picture === '' || authEdit.picture === undefined || authEdit.picture === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU'
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU"
              : authEdit.picture
          }
          alt="user-picture2"
        />
        <div className="user__details-info">
          <div className="user__details-info-personal">
            <table className="spacing-table">
              <tbody>
                <tr className="spacer">
                  <td className="lbl">
                    <label htmlFor="name">Име:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={authEdit.name === undefined ? "" : authEdit.name}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="lbl">
                    <label htmlFor="family_name">Фамилия:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      name="family_name"
                      defaultValue={
                        authEdit.family_name === undefined ? "" : authEdit.family_name
                      }
                      id="family"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="lbl">
                    <label htmlFor="email">Имейл:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      name="email"
                      defaultValue={authEdit.email}
                      id="email"
                      type="text"
                      autoComplete="off"
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="lbl">
                    <label htmlFor="phone">Телефон:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      name="phone"
                      defaultValue={authEdit.phone === undefined ? "" : authEdit.phone}
                      id="phone"
                      type="text"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="user__details-info-address">
            <table className="spacing-table">
              <tbody>
                <tr>
                  <td className="lbl">
                    <label htmlFor="city">Град:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      id="city"
                      name="city"
                      type="text"
                      defaultValue={authEdit.city === undefined ? "" : authEdit.city}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="lbl">
                    <label htmlFor="street">Улица:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      name="street"
                      defaultValue={
                        authEdit.street === undefined ? "" : authEdit.street
                      }
                      id="street"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="lbl">
                    <label htmlFor="street_number">Номер:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      name="street_number"
                      defaultValue={
                        authEdit.street_number === undefined ? "" : authEdit.street_number
                      }
                      id="street_number"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="lbl">
                    <label htmlFor="picture">Снимка:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      name="picture"
                      defaultValue={authEdit.picture === '' || authEdit.picture === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU' ? '' : authEdit.picture}
                      id="picture"
                      type="text"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="user__details-buttons">
          <button type="submit" className="btn-edit">
            готово
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserData;
