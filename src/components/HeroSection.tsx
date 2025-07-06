import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="border-b">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 py-8 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <Link href="/article/1" className="group">
              <h2 className="text-2xl leading-tight font-bold group-hover:text-blue-700 md:text-3xl">
                World&apos;s first personalized CRISPR therapy given to baby
                with genetic disease
              </h2>
            </Link>
            <p className="text-gray-700">
              Treatment seems to have been effective, but it is not clear
              whether such bespoke therapies can be widely applied
            </p>
          </div>
          <div className="relative h-64 md:h-full">
            <Image
              src="https://placehold.co/600x400"
              alt="Medical professionals treating a patient"
              fill
              className="rounded-md object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
