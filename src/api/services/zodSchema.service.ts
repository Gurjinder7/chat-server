import * as z from 'zod';

type userSchema = z.infer<typeof  userSchema>

const userSchema = z.object({
    name:z.string().trim().min(1),
    username:z.string().trim().min(3).regex(/^[a-zA-Z0-9_\-]+$/),
    password:z.string().trim().min(6),
})

// export {userSchema};

const checkUserSchema = (input) => {

    // try {
    //     return userSchema.parse(input)
    // } catch (err) {
    //     if (err instanceof z.ZodError) {
    //         return err
    //     }
    // }

    const result = userSchema.safeParse(input);
    if(result.success) {
        return result.data;
    } else {
        return result.error;
    }

}

export { checkUserSchema, userSchema };