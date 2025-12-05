import * as z from 'zod';
import {USER} from "../../utils/constant.ts";

type userSchema = z.infer<typeof  userSchema>
type chatSchema = z.infer<typeof  chatSchema>


const userSchema = z.object({
    name:z.string().trim().min(1),
    username:z.string().trim().min(3).regex(/^[a-zA-Z0-9_\-]+$/),
    password:z.string().trim().min(6),
})

const chatSchema = z.object({
    user: z.string().trim().min(1),
    otherUser: z.string().trim().min(1),
})


const checkSchema = (input, schemaType:string) => {

    // try {
    //     return userSchema.parse(input)
    // } catch (err) {
    //     if (err instanceof z.ZodError) {
    //         return err
    //     }
    // }
    let result;
    if (schemaType === USER) {
        result = userSchema.safeParse(input);
    } else {
        result = chatSchema.safeParse(input);
    }

    if(result.success) {
        return result.data;
    } else {
        return result.error;
    }

}





export { checkSchema, userSchema, chatSchema };