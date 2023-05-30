import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="header__home">
        <Link to="/" >Начало</Link>
      </div>
      <div className="header__prop">
        {user.email && (
          <Link className="header_hello" to={`/users/${user.id}`}>
            Здравейте {user.email}!
          </Link>
        )}
        <Link className="header_company" to="/company">
          За нас
        </Link>
        <Link className="header__products" to="/products">
          Продукти
        </Link>

        {user.email ? (
          <Link className="header__logout" to="/logout">
            Излез
          </Link>
        ) : (
          <>
            <Link className="header__login" to="/login">
              Влез
            </Link>
            <Link className="header__register" to="/register">
              Регистрация
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
