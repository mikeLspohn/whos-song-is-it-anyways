import type { Prisma } from '@prisma/client'
import type { ActionFunction } from '@remix-run/node'
import type { ListFormActionData } from '~/components/ListForm'
import { Form, useActionData } from '@remix-run/react'

import { db } from '~/utils/db.server'
import ListForm, { makeListAction } from '~/components/ListForm'

export const action: ActionFunction = async({
  request
}) => {
  return makeListAction({ request, dbFunction: db.wishlist.create } )
}

export default function NewListRoute() {
  const actionData = useActionData<ListFormActionData>()

  return (
    <main>
      <h1>Create A New List</h1>

      <Form method='post'>
        {actionData?.formError}
        <ListForm actionData={actionData} />
      </Form>
    </main>
  )
}
