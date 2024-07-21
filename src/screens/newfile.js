import React, {useState} from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './components/hello';
import ProductList from './components/ProductList';
import Footer from './components/footer';
import AddItem1 from './components/AddItem';

function App() {
  const productList=[
  {
    price: 9999,
    name: "iphone",
    quantity: 0,
},
{
  price: 100000,
  name: "macbook air m1",
  quantity: 0,
}
];
 const [product,setProductList] = useState(productList);
 const [totalAmount,setTotalAmount]=useState(0);
 const incrementQuantity=(index)=>{
  let newProductList=[...product];
  let newTotalAmount=totalAmount;
  newProductList[index].quantity++;
  newTotalAmount+=newProductList[index].price;
  setTotalAmount(newTotalAmount);
  setProductList(newProductList);
 }
 const decrementQuantity=(index)=>{
  let newProductList=[...product];
  let newTotalAmount=totalAmount;
  if(newProductList[index].quantity>0){
    newProductList[index].quantity--;
    newTotalAmount-=newProductList[index].price;
  }
  setTotalAmount(newTotalAmount);
  setProductList(newProductList);
 }
 const resetData=()=>{
  let newProductList=[...product];
  let newTotalAmount=totalAmount;
  newProductList.forEach((pro,i,newProductList)=>{
    newProductList[i].quantity=0;
  })
  setProductList(newProductList);
  newTotalAmount=0;
  setTotalAmount(newTotalAmount);
}
const removeItem=(index)=>{
  let newProductList=[...product];
  let newTotalAmount=totalAmount;
  newTotalAmount=newTotalAmount-newProductList[index].price*newProductList[index].quantity;
  setTotalAmount(newTotalAmount);
  newProductList.splice(index,1);
  setProductList(newProductList);
}
const AddItem=(name1,price1)=>{
  let newProductList=[...product];
  newProductList.push({
    price:price1,
    name:name1,
    quantity:0,
  });
  setProductList(newProductList);
}
  return (
    <>
    <Navbar/>
    <AddItem1 addItem={AddItem}/>
    <main className="container mt-5">
    <ProductList productList={product} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeItem={removeItem}/>
    </main>
    <Footer totalAmount1={totalAmount} resetData={resetData}/>
    </>
  );
}

export default App;