import type { ActionFunction } from '@remix-run/node'
import type { SpotifyTrackWithLyrics } from '~/services/spotify-genius-bridge.server'

import { redirect, json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { fetchSongAndLyrics } from '~/services/spotify-genius-bridge.server'
import { createArtist } from '~/models/artist.server'

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData()
  const formName = form.get('formName') as string

  if (formName === 'searchSong') {
    const trackName = form.get('trackName') as string

    if (trackName) {
      const track = await fetchSongAndLyrics(trackName)
      return json(track)
    }

    return json(null)
  } else {
    const track = form.get('trackInput') as string
    const artist = form.get('artistInput') as string
    const lyrics = form.get('lyricsInput') as string

    await createArtist({
      name: artist,
      tracks: {
        create: {
          name: track,
          lyrics
        }
      }
    })

    // redirect here if successful
    return redirect('/songs')
  }
}

export default function NewSongRoute() {
  const track = useActionData<SpotifyTrackWithLyrics | null>()
  console.log(track)

  return (
    <main>
      <h1>Search For Song Lyrics</h1>

      {!track && (
        <Form method='post'>
          <div>
            <label htmlFor='trackName'>Song Name:</label>
            <input 
              style={{marginBottom: '20px'}}
              type='text'
              name='trackName'
            />
          </div>
          <button name='formName' value='searchSong'>Search Song</button>
        </Form>
      )}

      {track && (
        <Form method='post'>
          <div>
            <p style={{marginBottom: '20px'}}>
              <label htmlFor='trackInput'>Track:</label>
              <input name='trackInput' type='text' defaultValue={track?.name} />
            </p>

            <p style={{marginBottom: '20px'}}>
              <label htmlFor='artistName'>Artist:</label>
              <input name='artistInput' type='text' defaultValue={track?.artists?.[0]?.name} />
            </p>

            <p style={{marginBottom: '20px'}}>
              <label htmlFor='lyricsInput'>Lyrics:</label>
              <input name='lyricsInput' type='text' defaultValue={track?.lyrics} />
            </p>

            <button name='formName' value='createSongEntry'>Create Song Entry</button>
          </div>
        </Form>
      )}
    </main>
  )
}
