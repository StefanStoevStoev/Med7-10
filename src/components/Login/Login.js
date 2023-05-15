import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../contexts/AuthContext";
import * as authService from "../../services/authService";

const Login = () => {
  const { userLogin } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const navigate = useNavigate();

  const handleBlur = () => {
    let email = document.getElementById("email").value;
    let result = email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (result === null) {
      return setError(true);
    }
    setError(false);
  };

  const handleBlurPass = () => {
    let pass = document.getElementById("password").value;
    if (Number(pass) < 4) {
      return setErrorPass(true);
    }
    setErrorPass(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.target));

    axios.post("http://localhost:5000/api/login", {
      email,
      password
    })
      .then(res => {
        // console.log(res.data);
        if (res.data.length > 0) {
          userLogin(res.data[0]);
          navigate('/');
        }
      })
      .catch((err) => toast.error(err.response.data));

    // console.log(userLogin);

    // promiseThen
    // .then((val) => {
    //     // console.log(val);
    // })
    // .catch((err) => console.log(err));

    // console.log(promiseThen);

    // console.log(log.json());

    // navigate('/');

    // const session = saveSession(result._id);
    // result.accessToken = session.accessToken;

    // authService
    //   .login(email, password)
    //   .then(authData => {
    //     // console.log(authData);
    //     userLogin(authData);
    //     if (authData.email === undefined) {
    //       navigate("/register");
    //       return;
    //     } else {
    //       navigate("/");
    //     }
    //   })
    //   .catch(() => {
    //     navigate('/404');
    //   });
  };

  return (
    <section className="login">
      <form id="login" onSubmit={onSubmit} >
        <fieldset>
          <legend>Влез</legend>
          <p className="field" >
            <label htmlFor="login__email">Имейл</label>
            <i className="fa-regular fa-envelope" />
            <span className="input">
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                onBlur={handleBlur}
              />
            </span>
            {error &&
              (<abbr className="form-error">
                Въведете валиден имейл!
              </abbr>)
            }
          </p>
          <p className="field">
            <label htmlFor="login__password">Парола</label>
            <i className="fa-solid fa-key" />
            <span className="input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="on"
                onBlur={handleBlurPass}
              />
            </span>
            {errorPass &&
              (<abbr className="form-error">
                Паролата трябва да съдържа повече от 3 символа!
              </abbr>)
            }
          </p>
          <button className="button submit" id="btn" type="submit" value="Потвърди" >
            Потвърди
          </button>
        </fieldset>
      </form>
    </section>
  );
};

export default Login;
