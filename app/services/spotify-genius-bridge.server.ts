import type { SpotifyTrack, SpotifyTrackResponse } from '~/services/spotify.server'
import { fetchSong } from '~/services/spotify.server'
import { getLyricsForTrack } from '~/services/genius-lyrics.server'

export type SpotifyTrackWithLyrics = SpotifyTrack & { lyrics: string }

export async function fetchSongAndLyrics (
  trackName: string
): Promise<SpotifyTrackWithLyrics | { error: string }> {
  const data = await fetchSong(trackName) as SpotifyTrackResponse
  const spotifyTrack = data.tracks.items[0]
  const lyrics = await getLyricsForTrack(spotifyTrack.artists[0].name, spotifyTrack.name)

  // Need to figure out what to do if lyrics fails to fetch
  if (typeof lyrics !== 'string') {
    return buildTrackWithLyrics(spotifyTrack, '')
  }

  return buildTrackWithLyrics(spotifyTrack, lyrics)
}

export async function buildTrackWithLyrics(
  track: SpotifyTrack, lyrics?: string
): Promise<SpotifyTrackWithLyrics> { 
  return {...track, lyrics: typeof lyrics === 'string' ? lyrics : '' }
}
