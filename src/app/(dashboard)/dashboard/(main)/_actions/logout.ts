"use server";

import {signOut} from "~/server/auth";

export default async function logout() {
    await signOut();
}