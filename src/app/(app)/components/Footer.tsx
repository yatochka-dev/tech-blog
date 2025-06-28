import Link from "next/link";
import { getAppConfig } from "~/data-access/appconf";

export default async function Footer() {
  const appConfig = await getAppConfig(); // the function is cached, so it will only run once

  return (
    <footer className="text-foreground bg-background mt-auto justify-self-end py-12">
      <div className="container mx-auto px-4">
        <div className="text-muted-foreground text-sm">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>
              © {appConfig.currentYear} {appConfig.appName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
