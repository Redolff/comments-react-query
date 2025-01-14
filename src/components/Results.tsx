import { useDeleteComment } from "../hooks/useDeleteComment"
import { CommentWithId } from "../service/comments"

export const Results = ({data}: {data?: CommentWithId[]}) => {
    const deleteCommentMutation = useDeleteComment()

    const handleDelete = (id: string) => {
        deleteCommentMutation.mutate(id)
    }

    return (
        <ul>
            <li>
                {data?.map((comment) => (
                    <article 
                        key={comment.id} 
                        className={`block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100`}>
                            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'> {comment.title} </h5>
                            <p className='font-normal text-gray-700'> {comment.message} </p>
                            <button onClick={() => handleDelete(comment.id)} className='mt-4 px-12 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'>
                                {deleteCommentMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                            </button>
                    </article>
                ))
                }
            </li>
        </ul>
    )
}