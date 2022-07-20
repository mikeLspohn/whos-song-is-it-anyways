import type { LoaderFunction } from '@remix-run/node'
import type { Wishlist } from '@prisma/client'

import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import { db } from 'app/utils/db.server'

export const loader: LoaderFunction = async ({ params }) => {
  const data: Wishlist | null = await db.wishlist.findUnique({ where: { id: params.listId }})
  return json(data)
}

export default function ListRoute() {
  const list = useLoaderData<Wishlist | null>()
  invariant(list, 'No list found')

  return (
    <main>
      <div className='heading-container'>
        <h1>{list.title}</h1>
        <Link to='edit'>
          <i className='fa fa-pencil' />
        </Link>
      </div>
    </main>
  )
}
