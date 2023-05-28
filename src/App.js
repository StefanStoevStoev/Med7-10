import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from './contexts/AuthContext';
import CreateUserData from './components/User/CreateUser/CreateUserData';
import PrivateRoute from './components/common/PrivateRouther';

import Home from "./components/Home/Home"
import Company from './components/Company/Company';
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";
import Sell from "./components/sell/Sell";
import User from "./components/User/User";
import UserDetails from "./components/User/UserDetails/UserDetails";

import "./App.css";
import { useLocalStorage } from './hooks/useLocalStorage';

let arrProductsId = [];

function App() {
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useLocalStorage('auth', {});
  let [orderData, setOrderData] = useState({});

  const [authEdit, setAuthEdit] = useState([]);
  let [userProductsEdit, setUserProductsEdit] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {

  }, []);

  const userProducts = (productsData) => {
    setOrderData({});
    const userId = user.id;
    const productsId = productsData._id;
    const quantity = Number(productsData.quantity);
    let dataOrder = {
      fk_users_id: userId,
      fk_product_id: productsId,
      quantity: quantity
    }
    if (orderData.length > 0) {
      orderData.map(x => {
        arrProductsId.push(x.fk_product_id);
      });
    }

    if (arrProductsId.find(element => element === productsId) === undefined) {
      arrProductsId.push(productsId);
      setUserProductsEdit(productsData);

      axios.post("http://localhost:5000/api/orders", {
        userId,
        productsId,
        quantity,
      }).then(() => {
        setOrderData(dataOrder)
      }).catch((err) => toast.error(err.response.data));
      navigate(`/users/${userId}`);
    }
    console.log(orderData);
  };

  const userLogin = (authData) => {
    setUser(authData);
    setAuth(authData);
    const fetchOrders = async () => {
      const userId = authData.id;
      try {
        const res = await axios.post("http://localhost:5000/api/orders/get", { userId });
        setOrderData(res.data);
      } catch (err) {
        toast.error(err.response);
      }
    };
    fetchOrders();
  };

  const userRemove = () => {
    setUser([]);
    setAuth({});
  }

  const userLogout = () => {
    setUser([]);
    setAuth({});
    navigate('/');
  };

  const userEdit = (userEditData) => {

    setAuthEdit(userEditData);
  };

  const addUserData = (userData) => {
    setUser(state => [
      ...state,
      userData
    ]);
    // navigate(`/users/${auth.accessToken}`);
  };

  return (
    <
      AuthContext.Provider value={
        {
          user,
          orderData,
          userProductsEdit,
          arrProductsId,
          userProducts,
          userLogin,
          userLogout,
          userEdit,
          authEdit,
          userRemove,
        }
      }
    >
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/company" element={<Company />} />
        <Route path="/products" element={<Sell />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/users/:userId" element={(
          <PrivateRoute>
            <User auth={user} userProductsEdit={userProductsEdit} />
          </PrivateRoute>
        )} />
        {/* <Route path="/users/*" element={<UserDetails userRemove={userRemove} />} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/jsonstore/:userId/edit" element={<CreateUserData addUserData={addUserData} />} />
      </Routes>
      <footer>© 2023 Пчелни продукти. Всички права са запазени.</footer>
    </
    AuthContext.Provider
    >
  );
}

export default App;
