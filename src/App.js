import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from './contexts/AuthContext';
import CreateUserData from './components/User/CreateUser/CreateUserData';
import PrivateRoute from './components/common/PrivateRouther';

import Admin from './components/Admin/Admin';
import Home from "./components/Home/Home"
import Company from './components/Company/Company';
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import NotFound from "./components/NotFound/NotFound";
import Logout from "./components/Logout/Logout";
import Register from "./components/Register/Register";
import Sell from "./components/sell/Sell";
import User from "./components/User/User";

import "./App.css";
// import { useLocalStorage } from './hooks/useLocalStorage';
let arrProductsId = [];
let temporaryOrderData = [];

function App() {
  const [user, setUser] = useState([]);
  // const [auth, setAuth] = useLocalStorage('auth', {});
  let [orderData, setOrderData] = useState({});
  let [userProductsEdit, setUserProductsEdit] = useState([]);
  const [authEdit, setAuthEdit] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const userId = user.id;
  let image = '';

  useEffect(() => {
    const papa = userDetails(userId);
    console.log(products);
  }, [user, products]);

  async function updateNonConfirmedOrder( quantity, userId, productId) {
    console.log(orderData);
    if (orderData.length > 0 && orderData.find(x => {
      return x.fk_product_id === Number(productId) && x.confirmed === 0
    })) {
      let res;
      try {
        res = await axios.post("http://localhost:5000/api/order/update/nco", { quantity, userId, productId })
          .then((data) => {
            console.log(data.data);
            orderData.forEach((x, index) => {
              if(x.fk_product_id === productId ) {
                  x[index].quantity = quantity;
              }
          });
            return data.data;
          })
          .catch((error) => console.log(error));
      } catch (err) {
        toast.error(err.response);
      }
    };
  };

  const userProducts = (productsData) => {
    console.log(productsData);
    console.log(orderData);

    const userId = user.id;
    const productsId = productsData._id;
    const quantity = Number(productsData.quantity);
    const dateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let dataOrder = {
      fk_users_id: userId,
      fk_product_id: productsId,
      quantity: quantity,
      date: dateTime,
      confirmed: 0,
    }

    if (orderData.length > 0 && orderData.find(x => x.fk_product_id === productsId && x.confirmed === 0)) {
      updateNonConfirmedOrder( quantity, userId, productsId);
      // setUserProductsEdit(productsData);
      // arrProductsId.push(productsId);
      console.log(orderData);
      // setOrderData(dataOrder);
      navigate(`/users/${userId}`);
    } else {
      arrProductsId.push(productsId);
      setUserProductsEdit(productsData);
      // console.log(userProductsEdit);

      axios.post("http://localhost:5000/api/orders/insert", {
        userId,
        productsId,
        quantity,
      }).then((data) => {

        temporaryOrderData.push(dataOrder);
        console.log(temporaryOrderData);
        setOrderData(dataOrder);
      }).catch((err) => toast.error(err.response));
      navigate(`/users/${userId}`);
    }
  };
  // console.log(products);
  const userLogin = (authData) => {
    setUser(authData);
    // setAuth(authData);
    const fetchOrders = async () => {
      const userId = authData.id;
      try {
        const res = await axios.post("http://localhost:5000/api/orders/get", { userId });
        
        temporaryOrderData = res.data;
        console.log(temporaryOrderData);
        setOrderData(res.data);
      } catch (err) {
        toast.error(err.response);
      }
    };
    fetchOrders();
  };

  const userRemove = () => {
    setUser([]);
    // setAuth({});
  }

  const userLogout = () => {
    setUser([]);
    // setAuth({});
    // setOrderData({});
    // setUserProductsEdit([]);
    setOrderData({});
    navigate('/');
  };

  async function userDetails(userId) {
    try {
      const res = await axios.post("http://localhost:5000/api/user/get", {
        userId,
      }).then((data) => {
        // console.log(data.data);
        setAuthEdit(data.data[0]);
        // setCurrentUser(data.data);
        return data.data[0];
      }).catch((err) => toast.error(err.response.data));
    } catch (err) {
      toast.error(err.response);
    }
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
          authEdit,
          setAuthEdit,
          setProducts,
          products,
          orderData,
          setOrderData,
          arrProductsId,
          userProductsEdit,
          userProducts,
          userLogin,
          userLogout,
          userRemove,
        }
      }
    >
      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/admin/:userId" element={(
          <PrivateRoute>
            <Admin auth={user} userProductsEdit={userProductsEdit} />
          </PrivateRoute>
        )} />
        <Route path="/company" element={<Company />} />
        <Route path="/products" element={<Sell />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/users/:userId/*" element={(
          <PrivateRoute>
            <User />
          </PrivateRoute>
        )} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/users/:userId/edit" element={<CreateUserData addUserData={addUserData} />} />
      </Routes>
      <footer>© 2023 Пчелни продукти. Всички права са запазени.</footer>
    </
    AuthContext.Provider
    >
  );
}

export default App;