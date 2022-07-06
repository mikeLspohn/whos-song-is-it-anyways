import type { Prisma } from '@prisma/client'
import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'

import { db } from '~/utils/db.server'

type WishlistPayload = Prisma.WishlistCreateInput

interface ActionData {
  formError?: string;
  fieldErrors?: {
    title: string | undefined;
    description: string | undefined;
  }
  fields?: WishlistPayload
}

function validatePayload({ title, description }: WishlistPayload) {
  let titleError;
  let descriptionError;

  if (!title || title.trim().length === 0) {
    titleError =  "Title can't be blank"
  }

  if (!description || description.trim().length === 0) {
    descriptionError =  "Description can't be blank"
  }

  return {
    title: titleError,
    description: descriptionError
  }
}

function badRequest(data: ActionData) {
  return json(data, { status: 400 })
}

export const action: ActionFunction = async({
  request
}) => {
  const form = await request.formData()
  const title = form.get('title')
  const description = form.get('description')

  if (typeof title !== 'string' || typeof description !== 'string') {
    return badRequest({ 
      formError: "Something went wrong submitting this form. Contact the administrator or file a bug report through the support widget."
    })
  }

  const payload: WishlistPayload = { title: title, description }
  const validationErrors = validatePayload(payload)

  if (Object.values(validationErrors).some(Boolean)) {
     return badRequest({ fieldErrors: validationErrors, fields: payload })
  }

  try {
    const newList = await db.wishlist.create({ data: payload })
    return redirect(`/lists/${newList.id}`)
  } catch(error) {
    return badRequest({formError: error as string})
  }
}

export default function NewListRoute() {
  const actionData = useActionData<ActionData>()

  return (
    <main>
      <h1>Create A New List</h1>

      <Form method='post'>
        {actionData?.formError}
        <div> 
          <label>
            Title: 
            <input 
              type='text' 
              name='title'
              defaultValue={actionData?.fields?.title} 
              aria-invalid={Boolean(actionData?.fieldErrors?.title) || undefined}
              aria-errormessage={
                actionData?.fieldErrors?.title
                  ? 'title-error'
                  : undefined
              }
            />
          </label>

          {actionData?.fieldErrors?.title ? (
            <p role='alert' id='title-error'>{actionData.fieldErrors.title}</p>
          ) : null}
        </div>
        <div> 
          <label>
            Description: 
            <input 
              type='text' 
              name='description' 
              defaultValue={actionData?.fields?.description} 
              aria-invalid={Boolean(actionData?.fieldErrors?.description)}
              aria-errormessage={actionData?.fieldErrors?.description
                ? 'description-error'
                : undefined
              }
            />
          </label>
          {actionData?.fieldErrors?.description ? (
            <p id='description-error' role='alert'>{actionData.fieldErrors.description}</p>
          ) : null}
        </div>

        <div>
          <button type='submit'>Save</button>
        </div>
      </Form>
    </main>
  )
}
