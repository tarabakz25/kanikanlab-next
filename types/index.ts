export type Blog = {
    id: string
    title: string
    body: string
    publishedAt: string
    heroImage: {
        url: string
        height?: number
        width?: number
    }
    categories: {
        id?: string
        category: string
    }[]
}
