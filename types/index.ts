type Tag = {
    id: number
    name: string
    transactions: unknown[]
}

type Transaction = {
    id: string
    amount: number
    createdOn: string
    description: string
    transactionCategory?: Tag
}

interface Config {
    [key: string]: string
    apiBase: string
}
