import {auth} from "~/server/auth";
import {redirect, RedirectType} from "next/navigation";

export default async function unauthenticated() {
    const session = await auth();

    if (session) {
    redirect("/dashboard", RedirectType.replace);
    }

}

