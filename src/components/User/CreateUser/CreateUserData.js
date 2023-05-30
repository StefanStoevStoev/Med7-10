import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import * as authService from "../../../services/authService";

const CreateUserData = () => {
  const { user, userEdit, authEdit } = useContext(AuthContext);
  const navigate = useNavigate();
  let image = '';

  const onClick = (e) => {
    e.preventDefault();

    const form = document.querySelector(".form");
    const submitter = document.getElementsByClassName("btn-edit");

    let userData = Object.fromEntries(new FormData(form, submitter));

    if (authEdit.img === "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU" || authEdit.img === undefined) {
      image = '';
    } else {
      image = authEdit.img;
    }

    userEdit(userData);

    authService.edit(userData, user._id);
    navigate(`/users/${user.accessToken}`);
  };

  return (
    <div className="user__details-edit">
      <form action="" className="form">
        <img
          src={
            authEdit.img === '' || authEdit.img === undefined || authEdit.img === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU'
              ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU"
              : authEdit.img
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
                    <label htmlFor="family">Фамилия:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      name="family"
                      defaultValue={
                        authEdit.family === undefined ? "" : authEdit.family
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
                      defaultValue={user.email}
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
                    <label htmlFor="street">Номер:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      name="number"
                      defaultValue={
                        authEdit.number === undefined ? "" : authEdit.number
                      }
                      id="number"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="lbl">
                    <label htmlFor="img">Снимка:</label>
                  </td>
                  <td>
                    <input
                      className="fld"
                      name="img"
                      defaultValue={authEdit.img === '' || authEdit.img === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7g2MhQxCyhB-EYgYLpBqPTk_z3TrBZmEKww&usqp=CAU' ? '' : authEdit.img}
                      id="img"
                      type="text"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="user__details-buttons">
          <button onClick={onClick} className="btn-edit">
            готово
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserData;
