export type Blog = {
    id: string
    title: string
    body: string
    publishedAt: string
    heroImage: {
        url: string
    }
    categories: {
        category: string
    }[]
}
