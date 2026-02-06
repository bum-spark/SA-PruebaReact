import React from "react";

export default function Item({ id, img, nombre, precio, cantidad, aumentarCantidad, quitarCantidad, quitarDelCarro }) {
    const imgn = "img/" + img + ".jpg"
    console.log(imgn + " " + nombre + " " + precio + " cantidad: " + cantidad);
  return (
    <tr>
      <td>
        <img
          className="img-fluid"
          src={imgn}
          alt="imagen guitarra"
        />
      </td>
      <td>{nombre}</td>
      <td className="fw-bold">${precio}</td>
      <td className="flex align-items-start gap-4">
        <button 
          type="button" 
          className="btn btn-dark"
          onClick={() => quitarCantidad(id)}
        >
          -
        </button>
        {cantidad}
        <button 
          type="button" 
          className="btn btn-dark"
          onClick={() => aumentarCantidad(id)}
        >
          +
        </button>
      </td>
      <td>
        <button 
          className="btn btn-danger" 
          type="button"
          onClick={() => quitarDelCarro(id)}
        >
          X
        </button>
      </td>
    </tr>
  );
}
