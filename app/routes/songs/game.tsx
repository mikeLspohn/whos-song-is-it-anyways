import { useRef, useEffect, useState } from 'react'
import type { LoaderFunction, LinksFunction } from "@remix-run/node";
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import graphStylesURL from '~/styles/graph.css'
import AnswersSection from '~/components/AnswersSection'
import QuestionSection from '~/components/QuestionSection'
import { fetchSong } from '~/services/spotify.server'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: graphStylesURL }]
}

type Song = {
  lyric: string
  artist: string
  song: string
}

type Answers = [string, string, string, string]

const songs: readonly [Song, Song, Song, Song] = [
  {
    lyric: "I've got your picture I'm coming with you. Dear Maria count me in",
    song: "Dear Maria",
    artist: "All Time Low"
  },
  {
    lyric: "Don't waste your time on me you're already the voice inside my head",
    song: "I Miss You",
    artist: "Blink 182"
  },
  {
    lyric: "Here I go! I scream my lungs out to try and get to you!",
    song: "Empty Apartment",
    artist: "Yellowcard"
  },
  {
    lyric: "I push my fingers into my.... eyes",
    song: "Duality",
    artist: "Slipknot"
  }
]

const answers = songs.map(({ artist }) => artist) as Answers

export const loader: LoaderFunction = async () => {
  try {
    const data = await fetchSong(songs[0].song)
    return json({
      track: data.tracks.items[0],
      selectedTrack: songs[0]
    })
  } catch(err) {
    return json({ error: err })
  }
}

export default function GraphRoute() {
  const [count, setCount] = useState(5)
  const [showAnswers, setShowAnswers] = useState(false)
  const intervalIdRef = useRef() as any
  const { track: song, selectedTrack } = useLoaderData()

  useEffect(() => {
    if (!showAnswers) {
      intervalIdRef.current = setInterval(() => {
        setCount(prevCount => prevCount - 1)
      }, 1000)
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current)
      }
    }
  }, [showAnswers])

  useEffect(() => {
    if (count === 0) {
      clearInterval(intervalIdRef.current)
      setShowAnswers(true)
    }
  }, [count])

  if (!song) return null
  console.log(selectedTrack)

  return <main>
    <div className='preview'>
      <a href={song.preview_url} target="_blank" rel="noreferrer">Preview Song</a>
    </div>

    {showAnswers ? (
      <AnswersSection 
        answers={answers} 
        correctAnswer={selectedTrack.artist} 
      />
    ) : (
      <QuestionSection lyric={selectedTrack?.lyric} count={count} />
    )}
  </main>
}
