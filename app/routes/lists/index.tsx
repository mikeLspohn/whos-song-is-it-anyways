import type { Prisma } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'

import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getLists } from '~/models/list.server'

type LoaderData = {
  lists: Prisma.PromiseReturnType<typeof getLists>
}

export const loader: LoaderFunction = async () => {
  const data: LoaderData = { lists: await getLists() }
  return json(data)
}

export default function Lists() {
  const { lists } = useLoaderData<LoaderData>()

  return (
    <main>
      <h1>My Lists</h1>

      {lists.map(list => (
        <li key={list.id}>
          <Link to={list.id}>{list.title}</Link>
          <p>{list.description}</p>
        </li>
      ))}
    </main>
  )
}
