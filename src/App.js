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
  const [orderData, setOrderData] = useState({});

  const [authEdit, setAuthEdit] = useState([]);
  let [userProductsEdit, setUserProductsEdit] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = user.id;
      try {
        const res = await axios.post("http://localhost:5000/api/orders/get", { userId });
        console.log(res);
        setOrderData(res);
      } catch (err) {
        toast.error(err.response);
      }
    };
    fetchOrders();

  }, []);

  const productDelete = (e) => {
    e.preventDefault();
    const element = e.target.parentElement;
    const id = element.getAttribute("name");

    let remove = userProductsEdit.filter(function (e) {
      return e._id !== Number(id);
    });
    setUserProductsEdit(remove);
  };

  const userProducts = (productsData) => {
    const userId = user.id;
    const productsId = productsData._id;
    const quantity = Number(productsData.quantity);

    // console.log(orderData.data.length);

    if ( orderData.data?.fieldCount !== 0 || orderData.data.length > 0) {

      orderData.data.map(x => {
        // console.log(orderData);
        arrProductsId.push(x.fk_product_id);
      });
    }

    if (arrProductsId.find(element => element === productsId) === undefined) {
      arrProductsId.push(productsId);
      // console.log(arrProductsId);
      setUserProductsEdit(productsData);

      axios.post("http://localhost:5000/api/orders", {
        userId,
        productsId,
        quantity,
      }).then((array) => {
        setOrderData(array)
      }).catch((err) => toast.error(err.response.data));
      navigate(`/users/${userId}`);
    }
  };

  const userLogin = (authData) => {
    setUser(authData);
    setAuth(authData);
  };

  const userRemove = () => {
    setAuth({});
  }

  const userLogout = () => {
    setAuth({});
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
          productDelete,
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
