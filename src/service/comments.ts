export interface Comment {
    title: string,
    message: string,
}

export interface CommentWithId extends Comment {
    id: string,
}

export const getComments = async () => {
    const response = await fetch('https://api.jsonbin.io/v3/b/6785f175e41b4d34e47717aa', {
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

    const response = await fetch('https://api.jsonbin.io/v3/b/6785f175e41b4d34e47717aa', {
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

export const deleteComment = async (idComment: string) => {
    const comments = await getComments()
    const commentsToSave = comments.filter((x: CommentWithId) => x.id !== idComment)

    const response = await fetch('https://api.jsonbin.io/v3/b/6785f175e41b4d34e47717aa', {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json',
            'X-Access-Key': '$2a$10$uIQWMUySHCWOGpMNSxi0XeF56MC4FwW9/jD0nQA/jGJCYBiF/Y7mS'
        },
        body : JSON.stringify(commentsToSave)
    })

    if(response.ok) {
        throw new Error('Failed to delete Comment: '+ idComment)
    }

    return commentsToSave
    
}