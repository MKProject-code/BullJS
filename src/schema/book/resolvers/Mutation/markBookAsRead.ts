
        import type   { MutationResolvers } from './../../../types.generated';
        export const markBookAsRead: NonNullable<MutationResolvers['markBookAsRead']> = async (_parent, _arg, _ctx) => {
                /* Implement Mutation.markBookAsRead resolver logic here */
                return new Promise(() => {
                        return {
                                success: true,
                                message: 'Book marked as read',
                                book: {
                                        id: 1,
                                        isRead: true
                                },
                        }
                });
        };