"use client";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const page = () => {
	const emptyCallback = async (data: { email: string; password: string }) => {
		return { sucess: true }; // or whatever default value you want
	};

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
				onSubmit={emptyCallback}
			/>
		</>
	);
};

export default page;
