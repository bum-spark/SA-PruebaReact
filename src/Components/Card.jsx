import React from 'react'

export default function Card({guitar, cart, setCart}) {

    const imagePath = "img/" + guitar.image + ".jpg";

    /*const handleClick = (name) => {
        console.log( `Guitarra ${name} agregada al carrito.` );
    }*/

    const handleClick = (item) => {
        console.log(item);
        setCart([...cart, item ]);
    }

    const handleClick2 = (item) => {
        const existeCarrito = cart.find( guitar => guitar.id === item.id );
        if(existeCarrito){
            const carritoActualizado = cart.map((guitar) => {
                if(guitar.id === item.id){
                    return { ...guitar, cantidad: guitar.cantidad + 1 }
                } else {
                    return guitar;
                }
            });
            setCart(carritoActualizado);
        } else {
            setCart([...cart, { ...item, cantidad: 1 } ]);
        }
    }

    function addToCart (item) {
        const itemExist = cart.findIndex( guitar => guitar.id === item.id );

        if(itemExist >= 0){
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity ++;
            setCart(updatedCart);
        } else {
            //agregando nueva propiedad a guitar
            item.quantity = 1;
            setCart([...cart, item ]);
        }
    }

  return (
            <div className="col-md-6 col-lg-4 my-4 row align-items-center">
                <div className="col-4">
                    <img className="img-fluid" src={imagePath} alt="imagen guitarra" />
                </div>
                <div className="col-8">
                    <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar.name}</h3>
                    <p>{guitar.description}</p>
                    <p className="fw-black text-primary fs-3">${guitar.price}</p>
                    <button 
                        type="button"
                        className="btn btn-dark w-100"
                        onClick={() => addToCart(guitar)}
                    >Agregar al Carrito</button>
                </div>
            </div>
  )
}