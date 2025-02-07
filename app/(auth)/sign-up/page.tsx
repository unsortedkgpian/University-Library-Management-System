"use client";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const Page = () => {
    // const emptyCallback = async (data: { email: string; password: string }) => {
    //     return { sucess: true }; // or whatever default value you want
    // };

    return (
        <>
            <AuthForm
                type="SIGN_UP"
                schema={signUpSchema}
                defaultValues={{
                    email: "",
                    password: "",
                    fullName: "",
                    universityId: 0,
                    universityCard: "",
                }}
                onSubmit={signUp}
            />
        </>
    );
};

export default Page;
