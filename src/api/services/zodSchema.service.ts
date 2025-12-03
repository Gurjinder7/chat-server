import * as z from 'zod';

const userSchema = z.object({
    name:z.string(),
    username:z.string(),
    password:z.string(),
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

export { checkUserSchema };