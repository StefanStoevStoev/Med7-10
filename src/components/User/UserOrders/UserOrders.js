import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
let arr = [];

const UserOrders = () => {
    const { user, orderData, setOrderData, arrProductsId } = useContext(AuthContext);
    const [state, setState] = useState([]);
    const [order, setOrder] = useState(false);

    useEffect(() => {
        console.log(arrProductsId);
        if (orderData.length > 0) {
            orderData.map((x) => {
                if (!arrProductsId.find(pp => pp === x.fk_product_id)) {
                    setState(fetchProducts(x.fk_product_id, x.quantity));
                }
            })
        } else if (orderData.fk_users_id !== undefined) {
            setState(fetchProducts(orderData.fk_product_id, orderData.quantity));
        }
        console.log(orderData);
    }, [orderData]);

    async function deleteOrder(userId, productsId) {
        try {
            await axios.post("http://localhost:5000/api/delete/order", {
                userId,
                productsId,
            }).then(() => {
            }).catch((err) => toast.error(err.response.data));
        } catch (err) {
            toast.error(err.response);
        }
    };

    const orderProduct = (e) => {
        e.preventDefault();
        // console.log(1);
        setOrder(true);
        // navigate(`/users/${user.id}`);
    };

    const productDelete = (orderDelete) => {
        orderDelete.preventDefault();
        const element = orderDelete.target.parentElement;
        const userId = user.id;
        const productsId = Number(element.getAttribute("name"));

        function remove(e) {
            return e.fk_product_id !== productsId;
        }

        if (orderData.length > 0) {
            orderData.filter(remove, productsId);
        } else {
            setOrderData({});
        }

        deleteOrder(userId, productsId);
        arr = arr.filter(x => x[0].id !== productsId);
        arrProductsId.filter(x => x !== productsId);
    };

    async function fetchProducts(productId, quantitNum) {
        let res;
        try {
            if (!arr.find(x => x[0].id === productId)) {
                res = await axios.post("http://localhost:5000/api/product/get", { productId })
                    .then((data) => {
                        const product = data.data[0];
                        product.quantity = quantitNum;
                        if (!arr.find(pp => pp.id === data?.data[0].id)) {
                            // setState(product);
                        }
                        return data.data;
                    })
                    .catch((error) => console.log(error));
                arrProductsId.push(res[0].id);

                setState(res);
                arr.push(res);
            }
        } catch (err) {
            toast.error(err.response);
        }
    };

    return (
        <>
            {arr.length > 0 ? arr.map(x =>
                < form className="sell__10 sell-10" key={x[0].id}
                    name={x[0].id} >
                    <img
                        src={x[0].img}
                        alt="honey-metal box"
                    />
                    <h4 className='title' >{x[0].title}</h4>
                    <p className="weight">{x[0].weight}kg</p>
                    <p className="price">Единична цена - {x[0].price}лв.</p>
                    <div className="quantity">
                        <label
                            className="screen-reader-text"
                            htmlFor="quantity_5ac7887e6a62a"
                        >
                            Количество
                        </label>
                        <input
                            id="quantity"
                            className="input-text qty text"
                            step={1}
                            min={1}
                            max={20}
                            name="quantity"
                            defaultValue={x[0].quantity}
                            title="Qty"
                            // size={4}
                            pattern="[0-9]*"
                            inputMode="numeric"
                            aria-labelledby=""
                            type="number"
                        />
                    </div>
                    <button
                        className="button sell10" onClick={orderProduct}>поръчка
                    </button>
                    <button className="btn-delete delete" onClick={productDelete}>отказвам</button>
                </form >
            )
                : <h3 className="userOrders">
                    Нямате поръчки
                </h3>
            }
            {order ? <h2 className="user-ordered">Поръчката ви е приета, ще се свържем с вас за потвърждаване на заявката.</h2> : ''}
        </>
    );
}

export default UserOrders;