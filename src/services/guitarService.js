const API_URL = 'http://localhost:4000/Api'

/** Obtiene todas las guitarras */
export async function getGuitars() {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`Error al obtener guitarras: ${response.status}`)
    const json = await response.json()
    return json.data
}

/** Crea una nueva guitarra (POST) */
export async function createGuitar(data) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`Error al crear guitarra: ${response.status}`)
    const json = await response.json()
    return json.data
}

/** Actualiza una guitarra completa (PUT) */
export async function updateGuitar(id, data) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error(`Error al actualizar guitarra: ${response.status}`)
    const json = await response.json()
    return json.data
}

/** Alterna disponibilidad (soft delete - PATCH) */
export async function toggleAvailability(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'PATCH' })
    if (!response.ok) throw new Error(`Error al cambiar disponibilidad: ${response.status}`)
    const json = await response.json()
    return json.data
}

/** Elimina una guitarra permanentemente (DELETE) */
export async function deleteGuitar(id) {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error(`Error al eliminar guitarra: ${response.status}`)
}

