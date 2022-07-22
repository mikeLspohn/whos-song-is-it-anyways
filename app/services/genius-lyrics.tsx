import * as cheerio from 'cheerio'

interface ResponseFailure {
  error: string
}

export async function fetchTrackPage(artistName: string, trackName: string): Promise<string | ResponseFailure> {
  // Some songs/artists have ' or : in the titles. Lyric genius URLs parse those out
  const replaceSpecialChars = /[^a-zA-Z0-9\s]/g
  // We don't want to be redirected by improper URLs
  // Genius.com uses this format `Artist-name-track-name` and is case sensitive
  const normalizedArtistName = artistName
    .replace(replaceSpecialChars, '')
    .split(' ')
    .map((word, idx) => {
      if (idx === 0) return word
      return word.toLowerCase()
    })
    .join(' ')
    .replace(/\s/g, '-')

  const normalizedTrackName = trackName
    .replace(replaceSpecialChars, '')
    .replace(/\s/g, '-')
    .toLowerCase()

  try {
    const urlPath = `${normalizedArtistName}-${normalizedTrackName}-lyrics`
    const response = await fetch(`https://genius.com/${urlPath}`)

    if (!response.ok) {
      return { error: "Something went wrong fetching the track page" }
    }

    return response.text()
  } catch(err) {
    console.error(err)
    return { error: "Something went wrong fetching the track page" }
  }
}

// Takes the response html string and transforms it into dom objects to query
// so we can get the HTML for the lyrics container and then transform that html
// into just the lyrics text.
export function scrapeLyricsFromResponseText(responseText: string) {
  const $document = cheerio.load(responseText)
  const $lyricsContainer = $document('[data-lyrics-container=true]').html()
  // We can't just use .textContent because it doesn't take into consideration
  // newlines and puts sentences from separate lines together with no spaces
  // so instead we have to parse the HTML into usable text.
  // Parse outanything inside of <> (html tags) and anything inside of [] (verse/production sections)
  const getTextFromHtmlRegex = new RegExp(/\b([1-9a-zA-Z\s'",:.-]*)(?![^<]*>|[^[]*])/g)
  const lyrics =  $lyricsContainer?.match(getTextFromHtmlRegex)?.filter(Boolean)?.join('<br>') 

  if (!lyrics) return {error: "Unable to parse lyrics"}
  return lyrics
}

export async function getLyricsForTrack(artistName: string, trackName: string): Promise<string | ResponseFailure> {
  const responseText = await fetchTrackPage(artistName, trackName)
  if (typeof responseText !== 'string') return responseText
  return scrapeLyricsFromResponseText(responseText)
}
