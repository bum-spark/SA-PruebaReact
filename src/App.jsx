import Header from './Components/Header.jsx'
import Card from './Components/Card.jsx'
import Footer from './Components/Footer.jsx'
import GuitarModal from './Components/GuitarModal.jsx'
import './App.css'
import { useState, useEffect } from 'react'
import { getGuitars, createGuitar, updateGuitar, deleteGuitar, toggleAvailability } from './services/guitarService.js'

function App() {
  // ── Guitarras ──────────────────────────────────────────────
  const [data, setData] = useState([])

  const loadGuitars = () => {
    getGuitars()
      .then(guitars => setData(guitars))
      .catch(err => console.error('Error cargando guitarras:', err))
  }

  useEffect(() => { loadGuitars() }, [])

  // ── Modal (null = cerrado, null guitar = crear, objeto = editar) ─
  const [modalOpen, setModalOpen]       = useState(false)
  const [guitarToEdit, setGuitarToEdit] = useState(null)

  const openCreate = () => { setGuitarToEdit(null); setModalOpen(true) }
  const openEdit   = (guitar) => { setGuitarToEdit(guitar); setModalOpen(true) }
  const closeModal = () => setModalOpen(false)

  const handleSave = async (formData) => {
    try {
      if (guitarToEdit) {
        await updateGuitar(guitarToEdit.id, formData)
      } else {
        await createGuitar(formData)
      }
      closeModal()
      loadGuitars()
    } catch (err) {
      console.error('Error al guardar:', err)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar esta guitarra permanentemente?')) return
    try {
      await deleteGuitar(id)
      loadGuitars()
    } catch (err) {
      console.error('Error al eliminar:', err)
    }
  }

  const handleToggle = async (id) => {
    try {
      await toggleAvailability(id)
      loadGuitars()
    } catch (err) {
      console.error('Error al cambiar disponibilidad:', err)
    }
  }

  // ── Carrito ────────────────────────────────────────────────
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const aumentarCantidad = (id) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
  }

  const quitarCantidad = (id) => {
    const item = cart.find(item => item.id === id)
    if (item.quantity === 1) {
      quitarDelCarro(id)
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    }
  }

  const quitarDelCarro = (id) => setCart(cart.filter(item => item.id !== id))
  const vaciarElCarro  = () => setCart([])

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
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="text-center">Nuestra Colección</h2>
          <button
            className="btn btn-dark"
            onClick={openCreate}
            title="Agregar nueva guitarra"
          >
            ➕ Nueva Guitarra
          </button>
        </div>

        <div className="row mt-5">
          {data.map(guitar => (
            <Card
              key={guitar.id}
              guitar={guitar}
              cart={cart}
              setCart={setCart}
              onEdit={openEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </main>

      <Footer/>

      {modalOpen && (
        <GuitarModal
          guitar={guitarToEdit}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default App
