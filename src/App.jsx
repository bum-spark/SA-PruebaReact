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

  const [cart, setCart] = useState([]);

  return (
    <div>
      <Header 
        guigui={cart}  
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