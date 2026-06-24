import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Carga de la pagina principal', () => {
    beforeEach(() => {
        render(<App />)
    })

    it('debería mostrar el título "Nuestra Colección"', () => {
        expect(screen.getByText('Nuestra Colección')).toBeInTheDocument()
    })

    it('debería cargar y mostrar las guitarras desde la API emulada', async () => {
        await waitFor(() => {
            expect(screen.getByText('Lukather')).toBeInTheDocument()
            expect(screen.getByText('SRV')).toBeInTheDocument()
            expect(screen.getByText('Borland')).toBeInTheDocument()
        })
    })

    it('debería mostrar los precios de las guitarras', async () => {
        await waitFor(() => {
            expect(screen.getByText('$299')).toBeInTheDocument()
            expect(screen.getByText('$349')).toBeInTheDocument()
            expect(screen.getByText('$329')).toBeInTheDocument()
        })

    })

    it('debería mostrar "disponibilidad" en cada guitarra', async () => {
        await waitFor(() => {
            const Disponibilidad = screen.getAllByText('✔ Disponible')
            expect(Disponibilidad.length).toBe(3)
        })
    })

    it('deberia mostrar el botón "Nueva Guitarra"', () => {
        expect(screen.getByTitle('Agregar nueva guitarra')).toBeInTheDocument()
    })
})

describe('Pruebas de la funcionalidad del carrito', () => {
    beforeEach(() => {
        localStorage.clear()
        render(<App />)
    })

    it('deberia mostrar "El carrito esta vacio" al inicio', () => {
        expect(screen.getByText('El carrito esta vacio')).toBeInTheDocument()
    })

    it('deberia agregar una guitarra al carrito al hacer clic en "Agregar al Carrito"', async () => {
        const user = userEvent.setup()

        await waitFor(() => {
            expect(screen.getByText('Lukather')).toBeInTheDocument()
        })

        const addButtons = screen.getAllByText('Agregar al Carrito')
        await user.click(addButtons[0])

        expect(screen.getByText(/Total pagar/i)).toBeInTheDocument()
    })

    it('deberia mostrar el botón "Vaciar Carrito" cuando hay items', async () => {
        const user = userEvent.setup()

        await waitFor(() => {
            expect(screen.getByText('Lukather')).toBeInTheDocument()
        })

        const addButtons = screen.getAllByText('Agregar al Carrito')
        await user.click(addButtons[0])

        expect(screen.getByText('Vaciar Carrito')).toBeInTheDocument()
    })

    it('deberia vaciar el carrito al hacer clic en "Vaciar Carrito"', async () => {
        const user = userEvent.setup()

        await waitFor(() => {
            expect(screen.getByText('Lukather')).toBeInTheDocument()
        })

        const addButtons = screen.getAllByText('Agregar al Carrito')
        await user.click(addButtons[0])

        expect(screen.getByText('Vaciar Carrito')).toBeInTheDocument()

        await user.click(screen.getByText('Vaciar Carrito'))

        expect(screen.getByText('El carrito esta vacio')).toBeInTheDocument()
    })
})

describe('Modal de guitarra (crear/editar)', () => {
    beforeEach(() => {
        render(<App />)
    })

    it('deberia abrir el modal de creación al hacer clic en "Nueva Guitarra"', async () => {
        const user = userEvent.setup()

        await user.click(screen.getByTitle('Agregar nueva guitarra'))

        expect(screen.getByText('Crear guitarra')).toBeInTheDocument()
    })

    it('deberia cerrar el modal al hacer clic en "Cancelar"', async () => {
        const user = userEvent.setup()

        await user.click(screen.getByTitle('Agregar nueva guitarra'))
        expect(screen.getByText('Crear guitarra')).toBeInTheDocument()

        await user.click(screen.getByText('Cancelar'))

        expect(screen.queryByText('Crear guitarra')).not.toBeInTheDocument()
    })

    it('deberia mostrar error de validación si se envía el formulario vacío', async () => {
        const user = userEvent.setup()

        await user.click(screen.getByTitle('Agregar nueva guitarra'))
        await user.click(screen.getByText('Crear guitarra'))

        expect(screen.getByText('El nombre y el precio son obligatorios.')).toBeInTheDocument()
    })

    it('deberia crear una guitarra exitosamente con datos válidos', async () => {
        const user = userEvent.setup()

        await user.click(screen.getByTitle('Agregar nueva guitarra'))

        await user.type(screen.getByPlaceholderText('Ej. Lukather'), 'Nueva Test')
        await user.type(screen.getByPlaceholderText('Ej. guitarra_01'), 'guitarra_test')
        await user.type(screen.getByPlaceholderText('Descripción de la guitarra...'), 'Una guitarra de prueba')
        await user.type(screen.getByPlaceholderText('Ej. 299'), '500')

        await user.click(screen.getByText('Crear guitarra'))

        await waitFor(() => {
            expect(screen.getAllByText('Nueva Test')).toHaveLength(1)
        })
    })

    it('deberia abrir el modal de edición al hacer clic en "✏️"', async () => {
        const user = userEvent.setup()

        await waitFor(() => {
            expect(screen.getByText('Lukather')).toBeInTheDocument()
        })

        const botonEditar = screen.getAllByTitle('Editar guitarra')
        await user.click(botonEditar[0])

        expect(screen.getByText('Guardar cambios')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Ej. Lukather')).toHaveValue('Lukather')
    })
})

describe('Acciones CRUD en las cards', () => {
    beforeEach(() => {
        render(<App />)
    })

    it('deberia hacer cambio de disponibilidad al hacer clic en 🚫', async () => {
        const user = userEvent.setup()

        await waitFor(() => {
            expect(screen.getByText('Lukather')).toBeInTheDocument()
        })

        const botonDesabilitar = screen.getAllByTitle('Desactivar (soft delete)')
        await user.click(botonDesabilitar[0])

        await waitFor(() => {
            expect(screen.getByText('Lukather')).toBeInTheDocument()
        })
    })
})

describe('Footer', () => {
    beforeEach(() => {
        render(<App />)
    })

    it('deberia mostrar el texto de derechos reservados', () => {
        expect(screen.getByText(/GuitarLA - Todos los derechos Reservados/i)).toBeInTheDocument()
    })
})
