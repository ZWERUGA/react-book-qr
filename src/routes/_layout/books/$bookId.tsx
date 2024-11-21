import { Id } from 'convex/_generated/dataModel'
import { createFileRoute } from '@tanstack/react-router'
import { useGetBook } from '@/features/books/api/use-get-book'

export const Route = createFileRoute('/_layout/books/$bookId')({
  component: Book,
})

function Book() {
  const { bookId } = Route.useParams()

  const { book, isLoading } = useGetBook(bookId as Id<'books'>)

  if (isLoading) {
    return <div>Загрузка книги...</div>
  }

  return <div>{book?.title}</div>
}
