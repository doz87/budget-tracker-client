import config from '@/config'

export const fetchTransactions = async (): Promise<Transaction[]> => {
    return await fetch(config.apiBase + '/transactions').then(res => res.json())
}

export const assignTagToTransaction = async (categoryId: number, transactionId: string): Promise<Transaction> => {
    return await fetch(config.apiBase + `/transaction-categories/${categoryId}/assign`, {
        method: 'POST',
        body: JSON.stringify({ transactionId }),
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
