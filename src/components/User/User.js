import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import UserDetails from "./UserDetails/UserDetails";
import UserOrders from "./UserOrders/UserOrders";
import CreateUserData from "./CreateUser/CreateUserData";

const User = () => {
    const { user, authEdit } = useContext(AuthContext);
    // const [orGet, setOrGet] = useState([]);
    let bool = true;
    const userId = user.id;
    //  const ordersGet = async (userId) => {
    //     let ord;
    //     try {
    //         await axios.post("http://localhost:5000/api/orders/get", {
    //             userId,
    //         }).then((data) => {
    //             ord = data.data;
    //             return data.data;
    //         }).catch((err) => toast.error(err.response.data));

    //     } catch (err) {
    //         toast.error(err.response);
    //     }
    //     console.log(ord);
    //     setOrGet(ord);
    // };
    useEffect(() => {

        // ordersGet(userId);
    }, []);

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