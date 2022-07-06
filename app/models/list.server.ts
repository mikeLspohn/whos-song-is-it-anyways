import { db } from '~/utils/db.server'

export function getLists() {
  return db.wishlist.findMany({ 
    select: {
      title: true,
      description: true,
      id: true
    }
  })
}
