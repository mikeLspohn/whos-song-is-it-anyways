export default function NewListRoute() {
  return (
    <main>
      <h1>Create A New List</h1>

      <form method='post'>
        <div> 
          <label>
            Title: <input type='text' name='title' />
          </label>
        </div>
        <div> 
          <label>
            Description: <input type='text' name='description' />
          </label>
        </div>

        <div>
          <button type='submit'>Save</button>
        </div>
      </form>
    </main>
  )
}
