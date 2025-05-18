import { useState } from "react";
import Input from "./Input";
import { useNavigate } from "react-router-dom";

function Add({handlerAdd}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

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

    const randomString = generateRandomString();

    const newItem = {
        id: randomString,
          name: name,
          quantity: parseInt(quantity),
          price: parseInt(price),
          discount: parseInt(discount),
       } 

    return(
        <>
            <Input value={name} label="Name" onChange={handlerChangeName} />
            <Input value={quantity} label="Quantity" onChange={handlerChangeQuantity} />
            <Input value={price} label="Price"  onChange={handlerChangePrice} />
            <Input value={discount} label="Discount" onChange={handlerChangeDiscount} />
            <button
                onClick={() => {
                handlerAdd(newItem);
                navigate('/view');
                }}
            >
                Add
            </button>
        </>
    )
}

export default Add;