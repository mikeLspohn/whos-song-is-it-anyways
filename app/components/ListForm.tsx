import type { Prisma } from '@prisma/client'
import { json, redirect } from '@remix-run/node'
import type { db } from '~/utils/db.server'

type WishlistPayload = Prisma.WishlistCreateInput

export interface ListFormActionData {
  formError?: string;
  fieldErrors?: {
    title: string | undefined;
    description: string | undefined;
  }
  fields?: WishlistPayload
}

interface Props {
  actionData: ListFormActionData | undefined
  list?: WishlistPayload
}

function badRequest(data: ListFormActionData) {
  return json(data, { status: 400 })
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

export async function makeListAction(
  { request, dbFunction }: { request: Request, dbFunction: typeof db.wishlist.create} ) {
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
    const newList = await dbFunction({ data: payload })
    return redirect(`/lists/${newList.id}`)
  } catch(error) {
    return badRequest({formError: error as string})
  }
}

export default function ListForm({ actionData, list }: Props) {
  return (
    <>
      <div className='input-box'> 
        <label htmlFor="title">
          Title: 
        </label>
        <input 
          type='text' 
          name='title'
          defaultValue={actionData?.fields?.title ?? list?.title}
          aria-invalid={Boolean(actionData?.fieldErrors?.title) || undefined}
          aria-errormessage={
            actionData?.fieldErrors?.title
              ? 'title-error'
              : undefined
          }
        />

        {actionData?.fieldErrors?.title ? (
          <p role='alert' id='title-error'>{actionData.fieldErrors.title}</p>
        ) : null}
      </div>
      <div className='input-box'> 
        <label htmlFor='description'>
          Description: 
        </label>
        <input 
          type='text' 
          name='description' 
          defaultValue={actionData?.fields?.description || list?.description} 
          aria-invalid={Boolean(actionData?.fieldErrors?.description)}
          aria-errormessage={actionData?.fieldErrors?.description
            ? 'description-error'
            : undefined
          }
        />
        {actionData?.fieldErrors?.description ? (
          <p id='description-error' role='alert'>{actionData.fieldErrors.description}</p>
        ) : null}
      </div>

      <div>
        <button type='submit'>Save</button>
      </div>
    </>
  )
}
