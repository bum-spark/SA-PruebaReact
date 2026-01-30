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
