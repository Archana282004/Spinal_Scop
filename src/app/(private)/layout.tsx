import Sidebar from "@/components/hoc/LayoutComponent/Sidebar";
interface PrivateLayoutProps {
  readonly children: React.ReactNode;
}

const PrivateLayout: React.FC<PrivateLayoutProps> = async ({ children }) => {

  return (
    <div id="wrapper" className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen grid-cols-[240px_1fr]">
        <aside className="border-r border-foreground/10">
          <Sidebar />
        </aside>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default PrivateLayout;