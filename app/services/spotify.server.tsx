interface SpotifyArtist {
  id: number
  name: string
  type: 'artist'
  uri: string
  href: string
  external_ids: any
}

export interface SpotifyTrack {
  album: any
  artists: SpotifyArtist[]
  available_markets: string[]
  disc_number: number
  duration: number
  explicit: boolean
  external_ids: any
  external_urls: any
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string | null
  track_number: number
  type: 'track'
  uri: string
}

export interface SpotifyTrackResponse {
  tracks: {
    items: SpotifyTrack[]
    href: string
    limit: number
    next: string | null
    offset: number
    previous: string | null
    total: number
  }
}

export async function fetchApiToken(): Promise<any> {
  const client_id = process.env.SPOTIFY_CLIENT_ID
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET

  try {
    const response = await fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accepts': 'application/json',
        'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`)
      },
      body: Buffer.from('grant_type=client_credentials')
    })

    const { access_token } = await response.json()
    return access_token
  } catch(err) {
    console.error(err)
  }
}

export async function fetchSong(trackTitle: string): Promise<SpotifyTrackResponse> {
  const token = await fetchApiToken()

  const urlSearchParams = new URLSearchParams({
    q: trackTitle,
    type: 'track',
    limit: '1'
  }).toString()

  const response = await fetch(`https://api.spotify.com/v1/search?${urlSearchParams}`, {
    method: 'GET',
    headers: { 
      'Authorization': 'Bearer ' + token
    }
  })
  return await response.json()
}
