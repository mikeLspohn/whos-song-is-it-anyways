import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getLists } from '~/models/list.server'

type LoaderData = {
  lists: Awaited<ReturnType<typeof getLists>>
}

export const loader = async () => {
  return json<LoaderData>({ 
    lists: await getLists()
  })
}

export default function Lists() {
  const { lists } = useLoaderData() as LoaderData

  return (
    <main>
      <h1>My Lists</h1>

      {lists.map(list => (
        <li key={list.id}>{list.title}</li>
      ))}
    </main>
  )
}
