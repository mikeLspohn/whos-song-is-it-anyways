import type { Prisma } from '@prisma/client'
import { db } from '~/utils/db.server'

export type TrackWithArtist = Prisma.TrackGetPayload<{
  include: { artist: true}
}>

export async function createTrack(trackParams: Prisma.TrackCreateInput) {
  return db.track.create({
    data: trackParams
  })
}
