import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-foreground bg-background mt-auto justify-self-end py-12">
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-400">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p>
              © {new Date(performance.now()).getFullYear()} Springer Nature
              Limited
            </p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white">
                Cookie Settings
              </Link>
              <Link href="#" className="hover:text-white">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:text-white">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
