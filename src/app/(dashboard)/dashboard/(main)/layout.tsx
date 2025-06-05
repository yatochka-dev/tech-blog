import authenticated from "~/server/guards/authenticated"
import {SidebarInset, SidebarProvider} from "~/components/ui/sidebar";
import {AppSidebar} from "~/components/app-sidebar";
import {SiteHeader} from "~/components/site-header";
import {api, HydrateClient} from "~/trpc/server";

export default async function DashboardLayout({
  children, 
}: {
  children: React.ReactNode
}) {
  const session = await authenticated()
      await api.config.get.prefetch({
          key: "appName"
      })

  return (
      <HydrateClient>
          <SidebarProvider
              style={
                  {
                      "--sidebar-width": "calc(var(--spacing) * 72)",
                      "--header-height": "calc(var(--spacing) * 12)",
                  } as React.CSSProperties
              }
          >
              <AppSidebar variant="inset" session={session} />
              <SidebarInset>
                  <SiteHeader />
                  <div className="flex flex-1 flex-col">
                      <div className="@container/main flex flex-1 flex-col gap-2">
                          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4">
                              {children}

                          </div>
                      </div>
                  </div>
              </SidebarInset>
          </SidebarProvider>
      </HydrateClient>
  )
}