import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import AuthLayoutClient from "./auth_layout";

const Layout = async ({ children }: { children: ReactNode }) => {
    const session = await auth();
    if (session) redirect("/");

    return <AuthLayoutClient>{children}</AuthLayoutClient>;
};

export default Layout;
