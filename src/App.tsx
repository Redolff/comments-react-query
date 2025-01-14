import { Results } from './components/Results'
import { FormInput, FormTextArea } from './components/Form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getComments, postComment, type CommentWithId } from './service/comments'
import { useState } from 'react'

const App = () => {
  const [localError, setLocalError] = useState<string|null>(null)
  const { data, isLoading, error } = useQuery<CommentWithId[]>({
    queryKey: ['comments'], 
    queryFn: getComments
  })

  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: postComment,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments'] })
    }
  })
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if(isPending) return
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = formData.get('title')?.toString() ?? ''
    const message = formData.get('message')?.toString() ?? ''

    if(title === '' || message === ''){
      setLocalError('Por favor, completa todos los datos antes de enviar.')
      return;
    }

    if(title !==  '' && message !== ''){
      mutate({ title, message })
    }
    setLocalError(null)
  }

  return (
    <>
      <h1 className='text-4xl font-bold text-center mt-8 p-5'> Comments React Query </h1>
      <main className='grid grid-cols-2 h-screen'>
        <div className='col-span-1 bg-white p-8'>

          {isLoading && <strong> Cargando... </strong>}
          {error !== null && <strong> Algo ha salido mal </strong>}
          <Results data={data}/>

        </div>
        <div className='col-span-1 bg-black p-8'>
          <form className={`${isPending ? 'opacity-40': ''} max-w-xl m-auto block px-4`} onSubmit={handleSubmit}>

            <FormInput />
            <FormTextArea />
            {localError
              ? <strong className='block p-2.5 text-white'> {localError} </strong>
              : null
            }
            {isError && <strong className='p-2 m-2 text-white'> Ocurrio un error al enviar el comentario </strong>}

            <button
              disabled={isPending} 
              type='submit' 
              className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'>
                {isPending ? 'Enviando comentario... ' : 'Enviar comentario'}
            </button>

          </form>
        </div>
      </main>
    </>
  )
}

export default App
