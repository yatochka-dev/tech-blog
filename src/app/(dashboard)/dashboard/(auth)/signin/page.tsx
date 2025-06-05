import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "~/components/ui/card";
import {Button} from "~/components/ui/button";
import {signIn} from "~/server/auth";
import unauthenticated from "~/server/guards/unauthenticated";

export default async function Signin() {

    await unauthenticated();


  return <Card> <CardHeader>

      <CardTitle>
          Sign in to your account using Discord
      </CardTitle>
  </CardHeader>

<CardFooter>

    <Button
        className={'cursor-pointer'}
        onClick={
        async () => {
            "use server";
            await signIn("discord");
        }
    }>
        Follow through Discord
    </Button>
</CardFooter>
  </Card>
}