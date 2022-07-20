export default function QuestionSection({ lyric, count }: { count: number, lyric: string }) {
  return (
    <div className='marquee-container'>
      <div className='marquee-content count'>{count}</div>
      <h1 className='marquee-content'>{lyric}</h1>
    </div>
  )
}
