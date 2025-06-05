import Link from "next/link";
import {Bell, ChevronDown, Rss, Search} from "lucide-react";
import {Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import Image from "next/image";

export default async function Home() {

  return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b bg-background">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <h1 className="text-3xl md:text-4xl font-serif font-bold">nature</h1>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/journals" className="text-sm hover:underline">
                View all journals
              </Link>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search" className="pl-8 h-9 w-40 md:w-60" />
              </div>
            </div>
            <Button size="sm" variant="outline" className="md:hidden">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="flex-1">
          <section className="border-b">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-6 py-8">
                <div className="space-y-4 flex flex-col justify-center">
                  <Link href="/article/1" className="group">
                    <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-blue-700">
                      World&apos;s first personalized CRISPR therapy given to baby with genetic disease
                    </h2>
                  </Link>
                  <p className="text-gray-700">
                    Treatment seems to have been effective, but it is not clear whether such bespoke therapies can be
                    widely applied
                  </p>
                </div>
                <div className="relative h-64 md:h-full">
                  <Image
                      src="https://placehold.co/600x400"
                      alt="Medical professionals treating a patient"
                      fill
                      className="object-cover rounded-md"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex flex-col space-y-3">
                  <div className="relative h-48 mb-2">
                    <Image
                        src="https://placehold.co/300x200"
                        alt="Researchers in a laboratory"
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <Link href="/article/2" className="group">
                    <h3 className="text-lg font-bold leading-tight group-hover:text-blue-700">
                      Can NIH-funded research on racism and health survive Trump&apos;s cuts?
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-700">
                    The US administration has cancelled &apos;DEI grants&apos; without defining DEI, leaving health-equity
                    researchers in the dark.
                  </p>
                  <div className="mt-auto pt-2">
                    <p className="text-xs text-gray-500">News • 16 May 2025</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="relative h-48 mb-2">
                    <Image
                        src="https://placehold.co/300x200"
                        alt="European Research Council building"
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <Link href="/article/3" className="group">
                    <h3 className="text-lg font-bold leading-tight group-hover:text-blue-700">
                      US brain drain: Nature&apos;s guide to the initiatives drawing scientists abroad
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-700">
                    In response to US turmoil, premier establishments such as the European Research Council have sweetened
                    incentives to attract talent.
                  </p>
                  <div className="mt-auto pt-2">
                    <p className="text-xs text-gray-500">News • 16 May 2025</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="relative h-48 mb-2">
                    <Image
                        src="https://placehold.co/300x200"
                        alt="Brain scan visualization"
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <Link href="/article/4" className="group">
                    <h3 className="text-lg font-bold leading-tight group-hover:text-blue-700">
                      A human-specific enhancer fine-tunes radial glia potency and corticogenesis
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-700">
                    HARES, a human accelerated region enhancer, modulates cortical development by influencing neural
                    progenitor cell behaviour.
                  </p>
                  <div className="mt-auto pt-2">
                    <p className="text-xs text-gray-500">Article • 14 May 2025</p>
                  </div>
                </div>

                <div className="flex flex-col space-y-3">
                  <div className="relative h-48 mb-2">
                    <Image
                        src="https://placehold.co/300x200"
                        alt="Scientific photography"
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <Link href="/article/5" className="group">
                    <h3 className="text-lg font-bold leading-tight group-hover:text-blue-700">
                      Daily briefing: These award-winning photos show scientists at work
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-700">
                    The best of scientists' photos from the field. Plus, researchers are split about whether it's OK for
                    AI to write science papers.
                  </p>
                  <div className="mt-auto pt-2">
                    <p className="text-xs text-gray-500">Nature Briefing • 14 May 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Current Issue */}
          <section className="py-8  ">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <h2 className="text-2xl font-bold">Latest Research</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Research Item 1 */}
                    <div className=" p-4 rounded-lg shadow-sm">
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">New</span>
                      <h3 className="mt-2 text-lg font-bold">
                        Climate tipping points more likely than previously thought
                      </h3>
                      <p className="mt-2 text-sm text-gray-700">
                        New research suggests that critical climate thresholds may be crossed sooner than expected.
                      </p>
                      <p className="mt-3 text-xs text-gray-500">Published: 15 May 2025</p>
                    </div>

                    {/* Research Item 2 */}
                    <div className=" p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-bold">Quantum computing breakthrough enables new error correction</h3>
                      <p className="mt-2 text-sm text-gray-700">
                        Scientists have developed a novel approach to quantum error correction that could accelerate
                        practical applications.
                      </p>
                      <p className="mt-3 text-xs text-gray-500">Published: 14 May 2025</p>
                    </div>

                    {/* Research Item 3 */}
                    <div className=" p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-bold">New antibiotic discovered in soil microbiome</h3>
                      <p className="mt-2 text-sm text-gray-700">
                        Researchers have identified a promising new antibiotic compound effective against drug-resistant
                        bacteria.
                      </p>
                      <p className="mt-3 text-xs text-gray-500">Published: 13 May 2025</p>
                    </div>

                    {/* Research Item 4 */}
                    <div className=" p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-bold">Biodiversity loss accelerating in marine ecosystems</h3>
                      <p className="mt-2 text-sm text-gray-700">
                        A comprehensive study reveals alarming rates of species decline in ocean habitats worldwide.
                      </p>
                      <p className="mt-3 text-xs text-gray-500">Published: 12 May 2025</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Current Issue</h2>
                  <div className=" p-4 rounded-lg shadow-sm">
                    <div className="relative h-80 mb-4">
                      <Image
                          src="https://placehold.co/300x400"
                          alt="Current issue cover"
                          fill
                          className="object-cover rounded-md"
                          sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="text-lg font-bold">Volume 618, Issue 7965</h3>
                    <p className="text-sm text-gray-700 mt-2">15 May 2025</p>
                    <div className="mt-4 space-y-2">
                      <Button className="w-full">Contents</Button>
                      <Button className="w-full" variant="outline">
                        Subscribe
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className=" text-foreground py-12 bg-background">
          <div className="container mx-auto px-4">

            <div className="text-sm text-gray-400">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p>© {new Date().getFullYear()} Springer Nature Limited</p>
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
      </div>
  )
}