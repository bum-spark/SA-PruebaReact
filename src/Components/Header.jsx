import React from 'react'
import Item from './item.jsx'

export default function Header({ guigui, aumentarCantidad, quitarCantidad, quitarDelCarro, vaciarElCarro }) {
//logic here

//const name = "Juan";


//crear components item
//con para metros {cart} = img, nombre y precio
console.log(guigui);

  const isEmpty = () => guigui.length === 0;

  const cartTotal = () => {
    return guigui.reduce((total, item) => total + (item.price * item.quantity ), 0);
  }

  return (

    <>
      <header className="py-5 header">
        <div className="container-xl">
          <div className="row justify-content-center justify-content-md-between">
            <div className="col-8 col-md-3">
              <a href="index.html">
                <img
                  className="img-fluid"
                  src="./public/img/logo.svg"
                  alt="imagen logo"
                />
              </a>
            </div>
            <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
              <div className="carrito">
                <img
                  className="img-fluid"
                  src="./public/img/carrito.png"
                  alt="imagen carrito"
                />

                <div id="carrito" className="bg-white p-3">
                  { isEmpty() ? (
                    <p className="text-center">El carrito esta vacio</p>
                  ) : (
                  <>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {guigui.map( guitarc => (
                          <Item 
                            key={guitarc.id}
                            id={guitarc.id}
                            img={guitarc.image}
                            nombre={guitarc.name}
                            precio={guitarc.price}
                            cantidad={guitarc.quantity}
                            aumentarCantidad={aumentarCantidad}
                            quitarCantidad={quitarCantidad}
                            quitarDelCarro={quitarDelCarro}
                          />
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar: <span className="fw-bold">${cartTotal()}</span>
                    </p>
                    
                    <button 
                      className="btn btn-dark w-100 mt-3 p-2"
                      onClick={vaciarElCarro}
                    >
                      Vaciar Carrito
                    </button>
                  </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
