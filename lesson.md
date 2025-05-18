# 2.8 React Router v6

### Preparation

Clone and fork the starter code from `code/begin_vite`. Import the `react-router-dom` package:

```
npm i react-router-dom@6
```

### Lesson Overview

Routes from root `localhost:5173`

| Route name | Description |
|---|---|
| `/addproduct` | Show product entry page |
| `/view` | Show index route of all products in list | 
| `/view/:id` | Show details of product according to ID

## Part 1: Top Navigation Menu

### Step 1: Connect to the URL

In order to use the React Router package, import the `BrowserRouter` component and wrap it around the the JSX return block:

```js
// App.js
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    ...
    <BrowserRouter>
      Shopping Cart
    </BrowserRouter>
  );
}
export default App;
```

### Step 2: Add Header Links

Create a new route component file called `routes/header.js` to include some links:

```js
// Header.js
import { Link, Outlet } from 'react-router-dom';

function Header() {
  return (
    <>
      <h1>Shopping Cart</h1>
      <nav>
        <Link to='/view'>View Product Details</Link> | {' '}
        <Link to='/add'>Add Product</Link>
      </nav>
      <Outlet />
    </>
  );
}
export default Header;

```

Import the new component into your app and test it:

```js
// App.js
...
function App() {
  return (
    ...
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
}
```

Click on the links and observe the URL in the address bar of your browser. 

Let's connect the links to some router functionality!

### Step 3: Add Routes

Create two new route components in the `routes` directory:

```js
// View.js
function View() {
  return (
    <>
      <h2>View</h2>
    </>
  )
}
export default View;

// Add.js
function Add() {
  return (
    <>
      <h2>Add</h2>
    </>
  )
}
export default Add

```
Add them into the main app and configure them into the router:

```js
// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './routes/Header';
import View from './routes/View';
import Add from './routes/Add';

function App() {
  return (
    ...
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />} />
          <Route path='view' element={<View />} />
          <Route path='add' element={<Add />} />
        </Routes>
      </BrowserRouter>
    ...
  );
}
```
Test out the new paths by clicking on the links. However, you will need to click
back button on your browser to get back to the *root* `/` URL path, which can be
quite tedious! 

### Step 4: Nested Routes

In navigation pages, it is common to have persistent layouts that are fixed as 
you click on links to view different pages. To implement persistant layout, you 
need to use *nested routes*:

```js
// App.js
    ...
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route path='view' element={<View />} />
            <Route path='add' element={<Add />} />
          </Route>
        </Routes>
      </BrowserRouter>
```
In the code above, the root path `/` renders only the `Header` component. When 
you click on the *View* link, the path matches `/` + `view`, so both `Header` 
and `View` are rendered consecutively. Similar behaviour when the *Add* link
is clicked.

Now, the `Header` component has two children, `View` and `Add`. In order to 
conditionality render either child according to the selected route, we need
to import `<Outlet>` into the parent:

```js
// Header.js
import { Link, Outlet } from 'react-router-dom';
  ...
    <nav>
      ...
    </nav>
    <Outlet />
  ...
```

Click on the links to navigate to the desired URL and see the title change
bottom of the page, with a persistant header layout.

### Step 5: Adding a Default 'No Match' Route

It is good practice to have a default page to show visitors when the router is 
not able match a link to any existing page on the site. We can do this be adding
a wildcard route path `*` that points to a default page element:

```js
// App.js
...
function App() {
  const DefaultPage = () => <p>Nothing to see here!</p>;
  return (
    ...
      <BrowserRouter>
        <Routes>
          ...        
          <Route path='*' element={<DefaultPage />} />
        </Routes>
      </BrowserRouter>
  );
}
```

Test the default page by clicking on any of the item listed in the side bar 
or entering an invalid URL endpoint, e.g. `localhost:3000/nothing`.

## Part 2: Side Bar Navigation

### Step 1: Listing Products

Let's create a sidebar where we can view the list products stored in our
shopping cart. The starter code includes dummy data which can be found in
`data.js`. Import the product list into the `App.js` and pass it to `View` 
as a prop. 

```js
// App.js
import { useState } from 'react';
import { dummyData } from './data';
...
function App() {
  const [list, setList] = useState(dummyData);
  return(
    ...
    <Route path='view' element={<View list={list} />} />
    ...
  )
}

// View.js
import styles from './View.module.css';
function View({ list }) {
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>
        <h2>View</h2>
        <nav className={styles.nav}>
          {list.map((item) => (
            <p>
              {item.name}
            </p>
          ))}
        </nav>
      </div>
    </div>
  );
}
export default View;
```

### Step 2: Styling Active NavLinks

Convert each `<p>` element in the list into a `<NavLink>`, which is a special 
type of link that knows whether or not it is *active*. This is useful for
navigation menus where you would like to know which item is current selected.

```js
// View.js
import { NavLink } from 'react-router-dom';
...
  {list.map((item) => (
      <NavLink 
        className={({ isActive }) =>
          isActive ? styles.linkActive : styles.link
        }
        to={`/view/${item.id}`}
        key={item.id}
      >
        {item.name}
      </NavLink>
    ))}
...  
```
Note in the code above that the `className` attribute is assigned a function
that conditionally returns a suitable styling class according to the `isActive` 
value that is passed by `NavLink`. 

The links are active, but the destination pages do not yet exist!

### Step 3: Reading URL Params

At the end of the previous step, we set up a list of links that routes to
individual pages that show details an item on the list. Each item can be 
identified by a unique item ID that can be extracted from the URL generated 
by the router.

Let's define a new route nested under the `view` endpoint to match URLs with 
the item ID and connect to a new `Item` router component:

```js
// App.js
...
import Item from './routes/Item';
function App() {
  ...
  return (
    ...
    <Routes>
      <Route path='/' element={<Header />}>
        <Route path='view' element={<View list={list} />} >
          <Route path=':id' element={<Item list={list} />} />
        </Route>
        ...
    </Routes>
    ...
  );
}
```
Create the new `Item` component that will read the URL parameter with the 
`useParam` hook:

```js
// Item.js
import { useParams } from 'react-router-dom';
function Item({ list }) {
  const { id } = useParams();
  return (
    <div>
      <h3>Product ID: {id}</h3>
    </div>
  )
}
export default Item;
```
In order for `Item` to show, we must add an `<Outlet>` to the parent layout:

```js
// View.js
import { NavLink, Outlet } from 'react-router-dom';
function View({ list }) {
  ...
    <div className={styles.container}>
      <div className={styles.sideBar}>
        ...
      </div>
      <Outlet />
    </div>
  );
}
```
We can now use the ID value from `useParams` to to look up the selected item 
matched to the product ID. Let's spruce up `Item` to show more product details 
with some CSS styling:

```js
// Item.js
import styles from './Item.module.css';
import { getProduct } from '../data';

function Item({ list }) {
  const { id } = useParams();
  const product = list.find((item) => item.id === id);
  return (
    <div className={styles.container}>
      <h3>Product ID: {id}</h3>
      <p>Name: {product.name}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Price: {product.price}</p>
      <p>Discount: {product.discount}</p>
    </div>
  )
}
```
### Step 4: Adding Index Routes

An index route points to a default page that is shown when a user has not clicked
on any item on a navigation list. To its parent, it is the default child route
that is selected when no other children can be matched. 

The `<Route>` attribute `index` is used to designate an index route that is attached
to the component page assigned to `element`.

Create a new `ItemDefault` component in the `route` folder to display a blank page and 
assign it to the `element` attribute of a index path.

```js
// ItemDefault.js
import styles from './ItemDefault.module.css';

function ItemDefault() {
  return (
    <div className={styles.container}>
      <p>Please select a product</p>
    </div>
  )
}
export default ItemDefault

// App.js
...
import ItemDefault from './routes/ItemDefault';
function App() {
  return (
    ...
      <Route path='view' element={<View list={list} />} >
        <Route index element={<ItemDefault />} />
        <Route path=':id' element={<Item list={list} />} />
      </Route>
    ...
  )
}
```
### Step 5: Navigating Programmatically 

A common use case for routers is to automatically send the visitor to another page 
after completing a task. For example, when the visitor clicks on a *Delete* button
while viewing a product page, the current page would not exist anymore after the 
product item has been removed.

Let's implement a *Delete* button on the `Item` component to allow visitors to remove 
items from the product list:

```js
// App
...
function App() {
  ...  
  const handlerDeleteProduct = (id) => {
    const newList = list.filter(
      (item) => item.id !== id
    );
    setList(newList);
  }
  ...
  return (
    ...
      <Route path=':id' element={<Item list={list} handlerDelete={handlerDeleteProduct} />} />
    ...
  )
}

// Item.js
...
function Item({ list, handlerDelete }) {
  ...
  const product = list.find((item) => item.id === id);
  return (
    <p>Discount: {product.discount}</p>
      <button
        onClick={() => {
          handlerDelete(id);
        }}
      >
        Delete
      </button>
    ...
  )
}

```

Observe and explain what happens when you click the *Delete* button.

The `useNavigate` hook can be be used to change the current URL
on your browser and switch to the referenced page, i.e. *programmatic
navigation*. This is exactly what we need to do after deleting our 
product item page.

```js
// Item.js
...
import { useParams, useNavigate } from 'react-router-dom';
const navigate = useNavigate();
...
  <button
    onClick={() => {
      handlerDelete(id);
      navigate('/view');
    }}
  >
```
## Assignment

### Implement the Add Product Page

Expand on the `Add` component route to allow the user to create a new
product. 

1. Create an input form to enter product details
    - Name
    - Quantity
    - Price
    - Discount
2. Create a handler function to add a new product item into the state list, 
   e.g. `handlerAddProduct()`
3. Create an *Add* button that shall call the add product handler
4. After adding a new product, automatically switch to the `View` page to show
   the new product added to the list.

### Implement an Edit Product Page (advanced)

Create a new `Edit` component route to allow the user to edit a current product.

1. Create an *Edit* button on the `Item` page that shall call the edit handler.
2. Create an edit handler function to fill in product details into an `Edit` form, 
   e.g. `handlerEditProduct()`
4. Create an *Submit* button on the `Edit` form that shall call the submit handler
2. Create a form submit handler function update the current item record in the state
   list, e.g. `handlerEditProduct()`
4. After submission, automatically return to the `View` page.
