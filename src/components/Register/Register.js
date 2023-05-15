import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import * as authService from "../../services/authService";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
  const { userLogin } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorPass, setErrorPass] = useState(false);
  const [errorRepPass, setErrorRepPass] = useState(false);
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

  const handleBlurRepPass = () => {
    const repPass = document.getElementById("confirm-pass").value;
    const pass = document.getElementById("password").value;

    let bool = repPass === pass;

    if (!error && !errorPass && !bool) {
      return setErrorRepPass(true);
    }
    setErrorRepPass(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-pass');

    if (password !== confirmPassword) {
      return;
    }
    axios.post("http://localhost:5000/api/post", {
      email,
      password
    }).catch((err) => toast.error(err.response.data));

    // userLogin('http://localhost:3030/users/register', {email, password});
    navigate('/');

    // setTimeout(() => {
    //   navigate('/')
    // }, 500);

    // authService.register(email, password)
    //   .then(authData => {
    //     userLogin(authData);
    //     navigate('/')
    //   });
  }
  return (
    <section className="register">
      <form id="register-form" onSubmit={onSubmit}>
        <fieldset>
          <legend>Регистрация</legend>
          <div className="field">
            <label htmlFor="email">Имейл</label>
            <i className="fa-regular fa-envelope" />
            <span className="input">
              <input
                type="email"
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
          </div>
          <p className="field">
            <label htmlFor="password">Парола</label>
            <i className="fa-solid fa-key" />
            <span className="input">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onBlur={handleBlurPass}
              />
            </span>
            {errorPass &&
              (<abbr className="form-error">
                Паролата трябва да съдържа повече от 3 символа!
              </abbr>)
            }
          </p>
          <p className="field">
            <label htmlFor="confirm-pass">Повтори паролата</label>
            <i className="fa-solid fa-key" />
            <span className="input">
              <input
                type="password"
                name="confirm-pass"
                id="confirm-pass"
                autoComplete="on"
                placeholder="Repeat Password"
                onBlur={handleBlurRepPass}
              />
            </span>
            {errorRepPass &&
              (<abbr className="form-error">
                Повторете точно паролата!
              </abbr>)
            }
          </p>
          <button className="button submit" type="submit" value="Потвърди">
            Потвърди
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default Register;