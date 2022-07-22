import type { TrackWithArtist } from '~/models/track.server'
import type { LoaderFunction } from '@remix-run/node'

import { useState } from 'react'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

export const loader: LoaderFunction = async () => {
  const songs = await db.track.findMany({
    include: {
      artist: true
    }
  })

  return json(songs)
}

export default function Tracks() {
  const tracks = useLoaderData<TrackWithArtist[]>()
  return (
    <main>
      <ul>
        {tracks.map(track => 
          <li style={{marginBottom: '40px'}} key={track.id}><Track track={track} /></li> 
        )}
      </ul>
    </main>
  )
}

function Track({ track }: { track: TrackWithArtist }) {
  const [showLyrics, setShowLyrics] = useState(false)

  return (
    <>
      <p>{track.name} - {track.artist?.name}</p>
      <p style={{marginBottom: '20px'}} onClick={() => setShowLyrics(!showLyrics)}>
        {showLyrics ? 'Hide Lyrics' : 'ShowLyrics'}
      </p>
      {showLyrics && <p dangerouslySetInnerHTML={{__html: track.lyrics}}/>}
    </>
  )
}
