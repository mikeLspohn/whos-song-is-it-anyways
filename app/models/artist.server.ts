import type { Prisma } from '@prisma/client'
import { db } from '~/utils/db.server'

export async function createArtist(artistParams: Prisma.ArtistCreateInput) {
  return db.artist.create({
    data: artistParams
  })
}
