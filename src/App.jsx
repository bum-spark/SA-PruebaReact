import Header from './Components/Header.jsx'
import Card from './Components/Card.jsx'
import Footer from './Components/Footer.jsx'
import './App.css'

//import { useState, useEffect, useReducer } from 'react'
//useState: Una variable va a estar renderizando cuando se utilice su metodo
//useEffect: esperar un resultado y luego utilizar las variables

import { useState, useEffect } from 'react'
import { db } from './db/db.js'


function App() {
  //     variable   metodo para        valor inicial
  //                actualizar 
  //               la variable
  /*const [customer, setCustomer] = useState({});
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [modal, setModal] = useState(false);

  ()=>setTotal(total + 1)*/
  
  /*if(auth){
    const [modal, setModal] = useState(false);
  }*/ 
  //Esto no se puede hacer dentro de un condicional o ciclo, los hooks se deben definir al iniicio

  /*console.log(customer);
  console.log(total);
  console.log(products);
  console.log(modal);*/

  const [data, setData] = useState(db);

  //xconsole.log(data);

  /*useEffect( ()=> {
    setData(db)
  }, [] );*/
  //Al momento que el db cambie, se va a ejecutar el useEffect

  //const [cart, setCart] = useState([]);

  //Se usa una funcion para inicializar el estado del carrito, de esta forma se puede recuperar el 
  // carrito guardado en localStorage al cargar la aplicacion
  const [cart, setCart] = useState(() => {
    const carritoGuardado = localStorage.getItem('cart');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  //Cada vez que el carrito cambie, se guarda en localStorage 
  // para mantener el estado del carrito entre sesiones
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const aumentarCantidad = (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const quitarCantidad = (id) => {
    const item = cart.find(item => item.id === id);
    if (item.quantity === 1) {
      quitarDelCarro(id);
    } else {
      const updatedCart = cart.map(item => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      setCart(updatedCart);
    }
  };

  const quitarDelCarro = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
  };

  const vaciarElCarro = () => {
    setCart([]);
  };

  return (
    <div>
      <Header 
        guigui={cart}
        aumentarCantidad={aumentarCantidad}
        quitarCantidad={quitarCantidad}
        quitarDelCarro={quitarDelCarro}
        vaciarElCarro={vaciarElCarro}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">

          {data.map(
            (guitar) => (
              <Card
                key={guitar.id}
                guitar={guitar}
                cart={cart}
                setCart={setCart}
              />
            ) 
          )}

        </div>
      </main>

      <Footer/>

    </div>

  )
}

export default App