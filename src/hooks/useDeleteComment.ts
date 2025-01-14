import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteComment } from "../service/comments"

export const useDeleteComment = () => {
    const queryClient = useQueryClient()


    return useMutation({
        mutationFn: deleteComment,
        onMutate: async (idComment: string) => {
            // Optimista actualizacion
            await queryClient.cancelQueries({ queryKey: ['comments'] })
            const previousComment = queryClient.getQueryData(['comments'])
            queryClient.setQueryData(['comments'], (old: any) =>
                old?.filter((comment: any) => comment.id !== idComment))

            return { previousComment }
        },
        onError: (error, idComment, context) => {
            queryClient.setQueryData(['comments'], context?.previousComment)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['comments'] })
        }
    })

}