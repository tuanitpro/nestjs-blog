export interface PostModel {
    id: string
    name: string
    content?: string
    author?: string,
    pictureUrl?: string
    tagId?: string[]
    categoryId?: string[]
    created?: Date
    createdBy?: string
}