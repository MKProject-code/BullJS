import type {QueryResolvers} from './../../../types.generated'

export const user: NonNullable<QueryResolvers['user']> = async (_parent, _arg, _ctx) => {
    /* Implement Query.user resolver logic here */
    return new Promise(() => {
        return [{
            id: 1,
            firstName: 'Joe',
        },{
            id: 2,
            firstName: 'Bob',
        }]
    })
}