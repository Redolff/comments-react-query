export interface Comment {
    title: string,
    message: string,
}

export interface CommentWithId extends Comment {
    id: string,
}

export const getComments = async () => {
    console.log('APIURL: ', import.meta.env.VITE_PUBLIC_API_URL)
    console.log('APIKEY ',import.meta.env.VITE_PUBLIC_API_KEY)
    const response = await fetch('https://api.jsonbin.io/v3/b/677bcac7acd3cb34a8c4f07f', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': '$2a$10$uIQWMUySHCWOGpMNSxi0XeF56MC4FwW9/jD0nQA/jGJCYBiF/Y7mS'
        }
    }) 

    if(!response.ok) {
        throw new Error('Failed to fetch comments.')
    }

    const json = await response.json()

    return json?.record
}

export const postComment = async (comment: Comment) => {
    const comments = await getComments()

    const id = crypto.randomUUID()
    const newComment = { ...comment, id }
    const commentToSave = [ ...comments, newComment ]

    const response = await fetch('https://api.jsonbin.io/v3/b/677bcac7acd3cb34a8c4f07f', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': '$2a$10$uIQWMUySHCWOGpMNSxi0XeF56MC4FwW9/jD0nQA/jGJCYBiF/Y7mS'
        },
        body: JSON.stringify(commentToSave)
    })

    if(!response.ok){
        throw new Error('Failed to post comment. ')
    }

    return newComment
}