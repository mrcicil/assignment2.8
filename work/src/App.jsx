
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Header from './routes/Header';
import View from './routes/View';
import Add from './routes/Add';
import { useState } from 'react';
import {dummyData} from "./data";
import Item from './routes/Item';
import Edit from './routes/Edit';

function DefaultPage(){
    return <h1>404 Error</h1>
  }

function ItemDefault(){
  return <p>Please select an item</p>
}

function App() {
  const [list, setList] = useState(dummyData);

  const handlerDeleteProduct = (id) => {
    const newList = list.filter(
      (item) => item.id !== id
    );
    setList(newList);
  }

  const handlerAddProduct = (newItem) => {
    console.log(newItem);
       const newList = [...list, newItem];
       setList(newList);
       console.log(newList);
  }

  const handlerEditProduct = (editItem) => {
    const newList = [...list];
    const product = newList.find((item) => item.id === editItem.id);
    product.name = editItem.name;
    product.quantity = editItem.quantity;
    product.price = editItem.price;
    product.discount = editItem.discount;
    setList(newList);
  }
  
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Header />}>

          <Route path="view" element={<View list = {list}/>}>
            <Route index element={<ItemDefault/>}/>
            {/* need to use :id for use params in item.jsx */}
            <Route path=":id"element={<Item list = {list} handlerDelete={handlerDeleteProduct}/>}/>
          </Route>

          <Route path="add" element={<Add handlerAdd={handlerAddProduct}/>}/>

          <Route path="edit/:id" element={<Edit list={list} handlerEdit={handlerEditProduct}/>}/>

          
          <Route path="*" element={<DefaultPage />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;