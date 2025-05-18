import { useParams } from "react-router-dom";
import styles from "./Item.module.css";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Edit({list, handlerEdit}){
    const {id} = useParams();
    const product = list.find((item) => item.id === id);
   

    const [name, setName] = useState("");
      const [quantity, setQuantity] = useState("");
      const [price, setPrice] = useState("");
      const [discount, setDiscount] = useState("");
      const navigate = useNavigate();

      const handlerChangeName = (value) => {
            setName(value);
        
      };

    const handlerChangeQuantity = (value) => {
        setQuantity(value);
      };

      const handlerChangePrice = (value) => {
        setPrice(value);
      };

      const handlerChangeDiscount = (value) => {
        setDiscount(value);
      };

      const editItem = {
        id: id,
        name: name,
        quantity: parseInt(quantity),
        price: parseInt(price),
        discount: parseInt(discount),
       } 

    return(
        <div className={styles.container}>
                <h2>Previous info</h2>
              <h3>Product ID: {id}</h3>
              <p>Name: {product.name}</p>
              <p>Quantity: {product.quantity}</p>
              <p>Price: {product.price}</p>
              <p>Discount: {product.discount}</p>

                <h2>Edit info</h2>
                <h3>Product ID: {id}</h3>
           <Input  value={name} label="Name" onChange={handlerChangeName} placeholder={product.name}/>
            <Input value={quantity} label="Quantity" onChange={handlerChangeQuantity} placeholder={product.quantity.toString()}/>
            <Input value={price} label="Price"  onChange={handlerChangePrice} placeholder={product.price.toString()} />
            <Input value={discount} label="Discount" onChange={handlerChangeDiscount} placeholder={product.discount.toString()} />

            <button
                onClick={() => {
                handlerEdit(editItem);
                navigate('/view');
                }}
            >
                Complete
            </button>
        
        </div>
    )
}

export default Edit;