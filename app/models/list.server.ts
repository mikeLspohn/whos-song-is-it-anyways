interface List {
  id: number
  title: string
  description?: string
}

export async function getLists(): Promise<Array<List>> {
  return [
    {
      id: 1,
      title: "My Christmas Wishlist",
      description: "This is my 2022 Christmas List"
    },
    {
      id: 1,
      title: "My Birthday Wishlist"
    }
  ]
}
