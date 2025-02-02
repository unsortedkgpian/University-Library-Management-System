'use server'

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { usersTable } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";


export const signInWithCredentials = async(params:Pick<AuthCredentials, 'email' |'password'>) => {
    const {email, password} = params;

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect:false
        })


        if(result?.error){
            return {success:false, error:result.error}
        }

        return {success:true}
        
    } catch (error) {
        console.log(error, 'Signin error');  
        return{success:false, error:"Signin error"}
        
    }
}

export const signUp = async(params:AuthCredentials) => {
    const {fullName, email, password, universityId, universityCard} = params;
    
    const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);


    if(existingUser.length >0) {
        return{success:false, error:"User already exists"}
    }

    const hashedPassword = await hash(password, 10);


    try {
        await db.insert(usersTable).values({
            fullName,
            email,
            universityId:Number(universityId),
            password:hashedPassword,
            universityCard,
        })

        await signInWithCredentials({email, password});

        return {success:true}
    } catch (error) {
        console.log(error, "SignUP Error");
        return {success:false, error:"SignUp Error"}
    }


}