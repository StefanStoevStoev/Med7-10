import { useState, useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import uniqid from 'uniqid';

import UserDetails from "./UserDetails/UserDetails";
import UserOrders from "./UserOrders/UserOrders";

const User = () => {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthContext);

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
            <UserDetails />
            { user.id ?
                <div className="user__orders" >
                    <UserOrders />
                </div> : ''
            }

        </section>
    );
}

export default User;