import type { LoaderFunction } from '@remix-run/node'
import type { Wishlist } from '@prisma/client'

import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { json } from '@remix-run/node'

import { db } from '~/utils/db.server'
import ListForm from '~/components/ListForm'

export const loader: LoaderFunction = async ({ params }) => {
  const data: Wishlist | null = await db.wishlist.findUnique({ where: { id: params.listId }})
  return json(data)
}

export default function ListEditRoute() {
  const actionData = useActionData()
  const list = useLoaderData()

  return (
    <main>
      <h1>Editing {list.title}</h1>
      <Form method='patch'>
        <ListForm list={list} actionData={actionData} />
      </Form>
    </main>
  )
}
