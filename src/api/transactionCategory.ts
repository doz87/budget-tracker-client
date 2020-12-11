import config from '@/config'

export const fetchCategories = async (): Promise<Tag[]> => {
    return await fetch(config.apiBase + '/transaction-categories').then(res => res.json())
}

export const createCategory = async (body: { [key: string]: string }): Promise<Tag> => {
    return await fetch(config.apiBase + '/transaction-categories', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            console.log(res)
            return res.json()
        })
        .catch(err => console.error(err))
}

export const deleteCategory = async (id: number): Promise<string[]> => {
    return await fetch(config.apiBase + `/transaction-categories/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => {
            console.log(res)
            return res.json()
        })
        .catch(err => console.error(err))
}
