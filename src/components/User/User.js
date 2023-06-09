import { useState, useContext } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import { AuthContext } from "../../contexts/AuthContext";


import UserDetails from "./UserDetails/UserDetails";
import UserOrders from "./UserOrders/UserOrders";
import CreateUserData from "./CreateUser/CreateUserData";

const User = () => {
    const { user, authEdit } = useContext(AuthContext);
    let bool = true;

    // const addProductToUser = (productData) => {
    //     console.log(productData);
    //     setProducts(state => [
    //         ...state,
    //         {
    //             ...productData,
    //             _id: uniqid(),
    //         },
    //     ]);
    // };

    return (
        <section className="user">
            {user.id ?
                <div className="user__orders" >
                    {bool ?
                        <>
                            <UserDetails authEdit={authEdit} />
                            <UserOrders />
                        </>
                        :
                        <>
                            <CreateUserData />
                            <UserOrders />
                        </>
                    }
                </div> : ''
            }
        </section>
    );
}

export default User;