export interface Comment {
    title: string,
    message: string,
}

export interface CommentWithId extends Comment {
    id: string,
}

export const getComments = async () => {
    const response = await fetch('https://api.jsonbin.io/v3/b/677bcac7acd3cb34a8c4f07f', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$HkiJNs3V9.Y.e5OQcDB3a.j/3IHqcrWWgneaevw.v0V0KQyD31jva'
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
            'X-Master-Key': '$2a$10$HkiJNs3V9.Y.e5OQcDB3a.j/3IHqcrWWgneaevw.v0V0KQyD31jva'
        },
        body: JSON.stringify(commentToSave)
    })

    if(!response.ok){
        throw new Error('Failed to post comment. ')
    }

    return newComment
}