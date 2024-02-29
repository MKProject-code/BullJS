import type {QueryResolvers} from './../../../types.generated'

export const book: NonNullable<QueryResolvers['book']> = async (_parent, _arg, _ctx) => {
    /* Implement Query.book resolver logic here */
    return new Promise(() => {
        return [{
            id: 1,
            isRead: true,
        },{
            id: 2,
            isRead: false,
        }]
    })
}