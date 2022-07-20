import type { Prisma } from '@prisma/client'

type SongWithArtist = Prisma.SongGetPayload<{
  include: { artist: true }
}>

const songs: SongWithArtist[] = [
  { 
    id: 1, 
    artist: {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'Yellowcard'
    },
    artistId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    lyrics: "My Song lyrics",
    name: 'My Song' 
  }, 
  { 
    id: 2, 
    artistId: 2,
    artist: {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'All Time Low'
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    lyrics: "My other song",
    name: 'Dear Maria, Count Me In' 
  } 
]

export default function SongsRoute() {
  return (
    <main>
      <ul>
        {songs.map(song => {
          return (
            <li key={song.id}>{song.name} - {song.artist?.name}</li>
          )
        })}
      </ul>
    </main>
  )
}
