export interface Post {
  id: number
  title: string
  authorId: number
}

export interface NewPost {
  title: string
  authorId: number
}