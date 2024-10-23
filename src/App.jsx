import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout/Layout";

import Home from "./pages/Home/Home";
import Todo from "./pages/Todo/Todo";
import Calculator from "./pages/Calculator/Calculator";
import Carts from "./pages/Carts/Carts";
import Component from "./pages/components/Components/component";
import Animation from "./pages/Animation/animation";

import Products from "./pages/Products/Products";

import "./App.css";
import { fetchProducts } from "./data/products";
import Login from "./pages/Login/Login";

const initTab = "home";

function App() {
  const [tab, setTab] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()),[]);

  useEffect(() => console.log(products), [products]);

  useEffect(() => {
    setTab(initTab);
  }, []);

  if(token === '') {
  return (<Login setToken={setToken} setRole={setRole} />) }
  else {
  return (
    <div className="app-container">
      <HashRouter>
        <Routes>
          <Route
            element={
              <Layout
                tab={tab}
                setTab={setTab}
                products={products}
                carts={carts}
                setCarts={setCarts}
                setToken={setToken}
                role={role}
              />
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/components" element={<Component />} />
            <Route path="/todo" element={<Todo />} />
            <Route
              path="/products"
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route
              path="/carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
  }
}

export default App;
