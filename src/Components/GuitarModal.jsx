import { useState, useEffect } from 'react'

const EMPTY_FORM = { name: '', image: '', description: '', price: '', availability: true }

export default function GuitarModal({ guitar, onSave, onClose }) {
  const isEditing = guitar !== null

  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  // Si se abre para editar, precarga los datos
  useEffect(() => {
    if (guitar) {
      setForm({
        name: guitar.name ?? '',
        image: guitar.image ?? '',
        description: guitar.description ?? '',
        price: guitar.price ?? '',
        availability: guitar.availability ?? true,
      })
    } else {
      setForm(EMPTY_FORM)
    }
    setError('')
  }, [guitar])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.price) {
      setError('El nombre y el precio son obligatorios.')
      return
    }
    if (Number(form.price) <= 0) {
      setError('El precio debe ser mayor a 0.')
      return
    }
    onSave({ ...form, price: Number(form.price) })
  }

  return (
    <div style={overlay}>
      <div style={modalBox}>
        {/* Header */}
        <div style={modalHeader}>
          <h5 style={{ margin: 0, fontWeight: 700 }}>
            {isEditing ? '✏️ Editar Guitarra' : '➕ Nueva Guitarra'}
          </h5>
          <button onClick={onClose} style={closeBtn} title="Cerrar">✕</button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.25rem' }}>
          {error && (
            <div style={errorBox}>{error}</div>
          )}

          <div style={formGroup}>
            <label style={label}>Nombre *</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              style={input}
              placeholder="Ej. Lukather"
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Imagen (nombre del archivo sin extensión)</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              style={input}
              placeholder="Ej. guitarra_01"
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Descripción</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              style={{ ...input, height: '70px', resize: 'vertical' }}
              placeholder="Descripción de la guitarra..."
            />
          </div>

          <div style={formGroup}>
            <label style={label}>Precio (USD) *</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              style={input}
              placeholder="Ej. 299"
              min="1"
            />
          </div>

          {isEditing && (
            <div style={{ ...formGroup, flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                id="availability"
                name="availability"
                checked={form.availability}
                onChange={handleChange}
                style={{ width: 'auto', cursor: 'pointer' }}
              />
              <label htmlFor="availability" style={{ ...label, margin: 0, cursor: 'pointer' }}>
                Disponible
              </label>
            </div>
          )}

          {/* Footer buttons */}
          <div style={footerBtns}>
            <button type="button" onClick={onClose} style={btnSecondary}>
              Cancelar
            </button>
            <button type="submit" style={btnPrimary}>
              {isEditing ? 'Guardar cambios' : 'Crear guitarra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Estilos inline ── */
const overlay = {
  position: 'fixed', inset: 0,
  background: 'rgba(0,0,0,0.55)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 9999,
}
const modalBox = {
  background: '#fff', borderRadius: '12px',
  width: '100%', maxWidth: '460px',
  boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
  overflow: 'hidden',
}
const modalHeader = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '1rem 1.25rem',
  borderBottom: '1px solid #e9ecef',
  background: '#f8f9fa',
}
const closeBtn = {
  background: 'none', border: 'none', fontSize: '1.1rem',
  cursor: 'pointer', color: '#6c757d', lineHeight: 1,
}
const formGroup = { display: 'flex', flexDirection: 'column', marginBottom: '0.85rem' }
const label = { fontSize: '0.82rem', fontWeight: 600, color: '#495057', marginBottom: '0.3rem' }
const input = {
  border: '1.5px solid #dee2e6', borderRadius: '6px',
  padding: '0.45rem 0.65rem', fontSize: '0.9rem',
  outline: 'none', width: '100%', boxSizing: 'border-box',
}
const errorBox = {
  background: '#fff3cd', border: '1px solid #ffc107',
  borderRadius: '6px', padding: '0.5rem 0.8rem',
  fontSize: '0.85rem', color: '#856404', marginBottom: '0.85rem',
}
const footerBtns = {
  display: 'flex', justifyContent: 'flex-end', gap: '0.6rem', marginTop: '1rem',
}
const btnPrimary = {
  background: '#212529', color: '#fff', border: 'none',
  borderRadius: '6px', padding: '0.5rem 1.2rem',
  fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
}
const btnSecondary = {
  background: '#fff', color: '#212529',
  border: '1.5px solid #dee2e6', borderRadius: '6px',
  padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem',
}
