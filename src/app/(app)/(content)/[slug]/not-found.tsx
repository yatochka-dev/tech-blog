import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className={"flex h-[60dvh] w-full items-center justify-center"}>
      <Alert variant="destructive" className={"container mx-auto max-w-md"}>
        <AlertCircleIcon />
        <AlertTitle>The requested article doesn&apos;t exist.</AlertTitle>
        <AlertDescription>
          <p>Please make sure the entered URL is valid.</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
