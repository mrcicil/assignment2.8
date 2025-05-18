import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Add({handlerAdd}) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();

  const handlerChangeName = (event) => {
    setName(event.target.value);
  }

  const handlerChangeQuantity = (event) => {
    setQuantity(event.target.value);
  }

  const handlerChangePrice = (event) => {
    setPrice(event.target.value);
  }

  const handlerChangeDiscount = (event) => {
    setDiscount(event.target.value);
  }

  const handleSubmit = () => {
    const newItem = {
      name: name,
      quantity: quantity,
      price: price,
      discount: discount
    }
    handlerAdd(newItem);
    navigate("/view");
  }

  return (
    <>
      <h2>Add</h2>
        <label for="name">Name:</label>
        <input type="text" name="name" onChange={handlerChangeName}/>
        <br/>
        <label for="quantity">Quantity:</label>
        <input type="number" name="quantity" onChange={handlerChangeQuantity}/>
        <br/>
        <label for="price">Price:</label>
        <input type="number" name="price" onChange={handlerChangePrice}/>
        <br/>
        <label for="discount">Discount:</label>
        <input type="number" name="discount" onChange={handlerChangeDiscount}/>
        <br/>
        <button onClick={handleSubmit}>Submit</button> 
    </>
  )
}
export default Add