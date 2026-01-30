import React from "react";

export default function Item({ img, nombre, precio }) {
    const imgn = "img/" + img + ".jpg"
    console.log(imgn + " " + nombre + " " + precio);
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
      <td className="fw-bold">{precio}</td>
      <td className="flex align-items-start gap-4">
        <button type="button" className="btn btn-dark">
          -
        </button>
        1
        <button type="button" className="btn btn-dark">
          +
        </button>
      </td>
      <td>
        <button className="btn btn-danger" type="button">
          X
        </button>
      </td>
    </tr>
  );
}
