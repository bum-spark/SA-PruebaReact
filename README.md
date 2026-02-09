# React + Vite

> **Notas de la clase:** Sistemas Abiertos II - Parcial 1

---


> **Entrega:** Componente item y props - 30/01/2026

## ¿Qué es React?

**React** es una librería de JavaScript creada por **Facebook en 2013**, diseñada para construir interfaces de usuario interactivas y dinámicas.

### Características principales:
- Se basa en **componentes reutilizables** que manejan su propio estado (State Hooks)
- Permite crear aplicaciones grandes a partir de pequeñas piezas aisladas
- Es utilizado por grandes empresas como: **Netflix, Instagram, Airbnb, WhatsApp Web**

---

## Ventajas de React

| Ventaja | Descripción |
|---------|-------------|
| **Virtual DOM** | Solo se renderiza lo necesario, mejorando el rendimiento |
| **Componentes reutilizables** | Bloques independientes que se pueden usar en varios lugares |
| **Comunidad activa** | Abundante documentación, librerías y actualizaciones constantes |

---

## Requisitos previos

- **Node.js** versión 22 o superior
- **NPM o Yarn** para gestionar dependencias del proyecto
- Conocimientos de **JavaScript ES6+**

---

## Métodos de instalación

### Opción 1: Create React App (tradicional)
```bash
npx create-react-app mi-proyecto
cd mi-proyecto
npm start
```

### Opción 2: Vite (recomendado)
```bash
npm create vite@latest mi-proyecto
cd mi-proyecto
npm install
npm run dev
```

> **¿Por qué Vite?** Es más rápido, está optimizado para proyectos nuevos y detecta automáticamente las dependencias que no se usan.

---

## Estructura del proyecto

```
/public          → Archivos estáticos (imágenes, favicon, etc.)
/src             → Código fuente de la aplicación
  └── App.jsx    → Componente principal que se renderiza
package.json     → Configuración de dependencias y scripts
```

---

## Tips y atajos útiles

- **`RFC`** para crear un nuevo componente funcional rápidamente
- React realiza **2 renderizaciones** iniciales por motivos de seguridad (StrictMode)
- Cada componente en una lista debe tener una **key única**

---

## Hooks principales

### `useState` - Manejo de estado
Permite crear variables que, al cambiar, re-renderizan solo la parte afectada del componente.

```jsx
//  variable    método para         valor inicial
//              actualizar
const [customer, setCustomer] = useState({});
const [total, setTotal] = useState(0);
const [products, setProducts] = useState([]);
const [modal, setModal] = useState(false);

// Para actualizar:
() => setTotal(total + 1)
```

> **Nota:** Los hooks NO pueden definirse dentro de condicionales o ciclos. Siempre deben declararse al inicio del componente.

```jsx
// INCORRECTO - Esto NO se puede hacer
if (auth) {
  const [modal, setModal] = useState(false);
}
```

### `useEffect` - Efectos secundarios
Permite ejecutar código cuando cambia una dependencia.

```jsx
useEffect(() => {
  setData(db);
}, [db]); // Se ejecuta cuando 'db' cambie
```

---

## Manejo de eventos onClick

Al usar `onClick`, es importante entender las diferentes formas de llamar funciones:

### Sin parámetros
```jsx
<button onClick={handleClick}>
  Agregar al Carrito
</button>
```
> Se llama solo cuando el usuario hace clic.

### Ejecución inmediata
```jsx
<button onClick={handleClick(guitar)}>
  Agregar al Carrito
</button>
```
> Se ejecuta inmediatamente al renderizar y se repite infinitamente.

### Con parámetros (arrow function)
```jsx
<button onClick={() => handleClick(guitar)}>
  Agregar al Carrito
</button>
```
> Se ejecuta al hacer clic y permite pasar parámetros correctamente.

---

> **Entrega:** LocalStorage y funciones entre componentes - 09/02/2026

## Renderizado condicional en JSX

En React no puedes usar `if` directamente dentro del JSX, pero puedes usar el **operador ternario** para mostrar contenido condicionalmente:

```jsx
{condicion ? (
  // Si es verdadero, muestra esto
  <p>Contenido A</p>
) : (
  // Si es falso, muestra esto
  <p>Contenido B</p>
)}
```

### Ejemplo práctico: Carrito vacío vs con productos

```jsx
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
```

> **Nota:** Cuando necesitamos renderizar múltiples elementos en una condición, se usa **Fragments** (`<> </>`) para envolverlos.

### Otras formas de renderizado condicional

```jsx
// Con operador && (solo muestra si es verdadero)
{carrito.length > 0 && <p>Tienes productos</p>}

// Con variable antes del return
let contenido;
if (isEmpty) {
  contenido = <p>Vacío</p>;
} else {
  contenido = <Table />;
}
return <div>{contenido}</div>;
```

---

## Paso de Props entre componentes (Props Drilling)

En React, los datos y funciones se pasan de **padre a hijo** mediante **props**. Si un componente nieto necesita una función del abuelo, debe pasar por cada nivel (como capas).

```
App (abuelo) → Header (padre) → Item (hijo)
```

### Ejemplo: Funciones del carrito

Las funciones `aumentarCantidad`, `quitarCantidad` y `quitarDelCarro` se crean en `App.jsx` y se pasan hacia abajo:

**1. En App.jsx (donde se crean las funciones):**
```jsx
const aumentarCantidad = (id) => {
  const updatedCart = cart.map(item => {
    if (item.id === id) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });
  setCart(updatedCart);
};

// Se pasan al Header
<Header 
  guigui={cart}
  aumentarCantidad={aumentarCantidad}
  quitarCantidad={quitarCantidad}
  quitarDelCarro={quitarDelCarro}
  vaciarElCarro={vaciarElCarro}
/>
```

**2. En Header.jsx (recibe y pasa al hijo):**
```jsx
export default function Header({ guigui, aumentarCantidad, quitarCantidad, quitarDelCarro, vaciarElCarro }) {
  // Las pasa al componente Item
  <Item 
    aumentarCantidad={aumentarCantidad}
    quitarCantidad={quitarCantidad}
    quitarDelCarro={quitarDelCarro}
  />
}
```

**3. En Item.jsx (las usa en los botones):**
```jsx
export default function Item({ id, aumentarCantidad, quitarCantidad, quitarDelCarro }) {
  return (
    <td>
      <button onClick={() => quitarCantidad(id)}>-</button>
      {cantidad}
      <button onClick={() => aumentarCantidad(id)}>+</button>
    </td>
    <td>
      <button onClick={() => quitarDelCarro(id)}>X</button>
    </td>
  );
}
```

> **Importante:** Las funciones viajan de padre a hijo, capa por capa. No se pueden "saltar" niveles directamente.

---

## localStorage - Persistencia de datos

**localStorage** es una API del navegador que permite guardar datos de forma persistente. Los datos permanecen incluso si se cierra el navegador.

### Características:
- No se necesita crear archivos ni carpetas nuevas
- Solo guarda **strings**, por eso usamos `JSON.stringify()` y `JSON.parse()`
- Los datos persisten hasta que se borren manualmente

### Cómo verificar localStorage en el navegador:
1. Abrir tu aplicación en el navegador
2. Presiona **F12** (o clic derecho → "Inspeccionar")
3. Ir a la pestaña **"Application"** (o "Aplicación")
4. En el menú izquierdo, está **"Local Storage"**

### Implementación en React

**1. Cargar datos al iniciar la aplicación:**
```jsx
const [cart, setCart] = useState(() => {
  const carritoGuardado = localStorage.getItem('cart');
  return carritoGuardado ? JSON.parse(carritoGuardado) : [];
});
```
- `localStorage.getItem('cart')` → Busca datos guardados con la clave "cart"
- `JSON.parse()` → Convierte el string a array/objeto
- Si no existe, retorna array vacío `[]`

**2. Guardar datos cuando cambien:**
```jsx
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);
```
- `useEffect` se ejecuta cada vez que `cart` cambia
- `localStorage.setItem('cart', ...)` → Guarda con la clave "cart"
- `JSON.stringify()` → Convierte el array a string

### Métodos principales de localStorage:

| Método | Descripción |
|--------|-------------|
| `localStorage.setItem('clave', valor)` | Guardar un dato |
| `localStorage.getItem('clave')` | Obtener un dato |
| `localStorage.removeItem('clave')` | Eliminar un dato |
| `localStorage.clear()` | Borrar todo el localStorage |

---
