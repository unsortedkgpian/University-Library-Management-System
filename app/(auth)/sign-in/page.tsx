"use client";

import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validations";
import React from "react";

const page = () => {
	const emptyCallback = async (data: { email: string; password: string }) => {
		return { sucess: true }; // or whatever default value you want
	};

	return (
		<AuthForm
			type="SIGN_IN"
			schema={signInSchema}
			defaultValues={{
				email: "",
				password: "",
			}}
			onSubmit={emptyCallback}
		/>
	);
};

export default page;
