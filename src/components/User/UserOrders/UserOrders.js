import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
let arr = [];
let arrProductsId = [];

const UserOrders = () => {
    const { orderData, productDelete } = useContext(AuthContext);
    const [state, setState] = useState([]);
    // const [arrNew, setArrNew] = useState([]);

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
                
                
            }

        } catch (err) {
            toast.error(err.response);
        }
        setState(res);
        arr.push(res);
        console.log(res);
    };

    useEffect(() => {
        if (orderData.length > 0) {
            orderData.map((x) => {
                if (!arrProductsId.find(pp => pp === x.fk_product_id)) {
                    setState(fetchProducts(x.fk_product_id, x.quantity));
                }
            })
        } else if (orderData.fk_users_id !== undefined) {
            setState(fetchProducts(orderData.fk_product_id, orderData.quantity));
        }
        // setState(arr);
        // console.log(state);
        // if ( typeof orderData === 'object'){
        //     orderData = {};
        // };
    }, [orderData]);
    console.log(arr);
    console.log(state);
    // useEffect(() => {
    // }, [arrNew]);

    const orderProduct = () => {

    };

    return (
        <>
            {state.length > 0 ? arr.map(x =>
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
        </>
    );
}

export default UserOrders;