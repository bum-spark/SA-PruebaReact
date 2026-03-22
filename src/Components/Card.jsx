import React from 'react'

export default function Card({ guitar, cart, setCart, onEdit, onDelete, onToggle }) {

    const imagePath = "img/" + guitar.image + ".jpg"

    function addToCart(item) {
        const itemExist = cart.findIndex(g => g.id === item.id)
        if (itemExist >= 0) {
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        } else {
            setCart([...cart, { ...item, quantity: 1 }])
        }
    }

    const isAvailable = guitar.availability

    return (
        <div className="col-md-6 col-lg-4 my-4 row align-items-center" style={{
            borderRadius: '6px',
            transition: 'border-color 0.3s'
        }}>
            {/* Imagen */}
            <div className="col-4">
                <img className="img-fluid" src={imagePath} alt={`Guitarra ${guitar.name}`} />
            </div>

            {/* Info */}
            <div className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{guitar.name}</h3>
                <p style={{ fontSize: '0.85rem', color: '#555' }}>{guitar.description}</p>
                <p className="fw-black text-primary fs-3">${guitar.price}</p>

                {/* Disponibilidad badge */}
                <span style={{
                    display: 'inline-block', marginBottom: '0.5rem',
                    background: isAvailable ? '#d1e7dd' : '#f8d7da',
                    color: isAvailable ? '#0f5132' : '#842029',
                    borderRadius: '4px', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 600
                }}>
                    {isAvailable ? '✔ Disponible' : '✖ No disponible'}
                </span>

                {/* Botón carrito */}
                <button
                    type="button"
                    className="btn btn-dark w-100 mb-2"
                    onClick={() => addToCart(guitar)}
                    disabled={!isAvailable}
                    title={!isAvailable ? 'Guitarra no disponible' : ''}
                >
                    Agregar al Carrito
                </button>

                {/* Botones de acción CRUD */}
                <div className="d-flex gap-2">
                    {/* Editar */}
                    <button
                        type="button"
                        style={actionBtn('#0d6efd')}
                        onClick={() => onEdit(guitar)}
                        title="Editar guitarra"
                    >
                        ✏️
                    </button>

                    {/* Soft delete (toggle disponibilidad) */}
                    <button
                        type="button"
                        style={actionBtn(isAvailable ? '#fd7e14' : '#198754')}
                        onClick={() => onToggle(guitar.id)}
                        title={isAvailable ? 'Desactivar (soft delete)' : 'Reactivar'}
                    >
                        {isAvailable ? '🚫' : '✅'}
                    </button>

                    {/* Eliminar permanente */}
                    <button
                        type="button"
                        style={actionBtn('#dc3545')}
                        onClick={() => onDelete(guitar.id)}
                        title="Eliminar permanentemente"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    )
}

function actionBtn(bg) {
    return {
        flex: 1,
        background: bg,
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '0.3rem',
        cursor: 'pointer',
        fontSize: '1rem',
        transition: 'opacity 0.2s',
    }
}
