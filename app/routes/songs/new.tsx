import { fetchSong } from '~/services/spotify'
import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { getLyricsForTrack } from '~/services/genius-lyrics'
import type { SpotifyTrack, SpotifyTrackResponse } from '~/services/spotify'

type Track = SpotifyTrack & { lyrics: string }

const fetchSongAndLyrics = async (trackName: string): Promise<Track | { error: string }> => {
  const data = await fetchSong(trackName) as SpotifyTrackResponse
  const spotifyTrack = data.tracks.items[0]
  const lyrics = await getLyricsForTrack(spotifyTrack.artists[0].name, spotifyTrack.name)

  let track = {...spotifyTrack, lyrics: typeof lyrics === 'string' ? lyrics : '' }

  return track
}

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
    return json(null)
  }
}

export default function NewSongRoute() {
  const track = useActionData<Track | null>()

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
              <span className='bold'>Track:</span> {track?.name}
            </p>
            <p style={{marginBottom: '20px'}}>
              <span className='bold'>Artist:</span> {track?.artists?.[0]?.name}
            </p>
            <p style={{marginBottom: '20px'}}>
              <span className='bold'>Lyrics:</span>{" "}
              <span dangerouslySetInnerHTML={{__html: track?.lyrics}} />
            </p>
            <button name='formName' value='createSongEntry'>Create Song Entry</button>
          </div>
        </Form>
      )}
    </main>
  )
}
