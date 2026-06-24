import { http, HttpResponse } from 'msw'

const API_URL = 'http://localhost:4000/Api'

const guitars = [
    {
        id: 1, name: 'Lukather', image: 'guitarra_01',
        description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
        price: 299,
        availability: true,
        deleted: false,
        createdAt: '2026-06-23T02:44:59.408Z',
        updatedAt: '2026-06-23T02:44:59.408Z'
    },
    {
        id: 2, name: 'SRV', image: 'guitarra_02',
        description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
        price: 349,
        availability: true,
        deleted: false,
        createdAt: '2026-06-23T02:44:59.408Z',
        updatedAt: '2026-06-23T02:44:59.408Z'
    },
    {
        id: 3, name: 'Borland', image: 'guitarra_03',
        description: 'Morbi ornare augue nisl, vel elementum dui mollis vel. Curabitur non ex id eros fermentum hendrerit.',
        price: 329,
        availability: true,
        deleted: false,
        createdAt: '2026-06-23T02:44:59.408Z',
        updatedAt: '2026-06-23T02:44:59.408Z'
    },
]

export const handlers = [

    http.get(API_URL, () => {
        const activeGuitars = guitars.filter(g => !g.deleted)
        return HttpResponse.json({ data: activeGuitars })
    }),

    http.get(`${API_URL}/:id`, ({ params }) => {
        const guitar = guitars.find(g => g.id === Number(params.id) && !g.deleted)

        if (!guitar) {
            return HttpResponse.json(
                { error: 'Guitarra no encontrada' },
                { status: 404 }
            )
        }

        return HttpResponse.json({ data: guitar })
    }),

    http.post(API_URL, async ({ request }) => {
        const body = await request.json()
        const now = new Date().toISOString()

        const newGuitar = {
            id: guitars.length + 1,
            name: body.name,
            image: body.image || '',
            description: body.description || '',
            price: body.price,
            availability: true,
            deleted: false,
            createdAt: now,
            updatedAt: now
        }

        guitars.push(newGuitar)
        return HttpResponse.json({ data: newGuitar })
    }),

    http.put(`${API_URL}/:id`, async ({ params, request }) => {
        const guitar = guitars.find(g => g.id === Number(params.id) && !g.deleted)

        if (!guitar) {
            return HttpResponse.json(
                { error: 'Guitarra no encontrada' },
                { status: 404 }
            )
        }

        const body = await request.json()
        guitar.name = body.name
        guitar.price = body.price
        guitar.availability = body.availability
        guitar.updatedAt = new Date().toISOString()

        return HttpResponse.json({ data: guitar })
    }),

    http.patch(`${API_URL}/:id`, ({ params }) => {
        const guitar = guitars.find(g => g.id === Number(params.id) && !g.deleted)

        if (!guitar) {
            return HttpResponse.json(
                { error: 'Guitarra no encontrada' },
                { status: 404 }
            )
        }

        guitar.availability = !guitar.availability
        guitar.updatedAt = new Date().toISOString()

        return HttpResponse.json({ data: guitar })
    }),

    http.delete(`${API_URL}/:id`, ({ params }) => {
        const guitar = guitars.find(g => g.id === Number(params.id) && !g.deleted)

        if (!guitar) {
            return HttpResponse.json(
                { error: 'Guitarra no encontrada' },
                { status: 404 }
            )
        }

        guitar.deleted = true
        guitar.updatedAt = new Date().toISOString()

        return HttpResponse.json({ data: 'Guitarra eliminada' })
    }),
]