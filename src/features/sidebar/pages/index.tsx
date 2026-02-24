import { useEffect, useState } from 'react';
import TopBar from '../../../components/common/Topbar';
import Sidebar from '../components/Sidebar'
import type { Page, SidebarPageProps } from '../types';



const SidebarPage = ({children}: SidebarPageProps) => {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [collapsed,  setCollapsed]  = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
   useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
 return (
    <div
      className="flex h-screen bg-slate-50 overflow-hidden"
      style={{ fontFamily: "'Syne','Segoe UI',sans-serif" }}
    >
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      {/* Mobile backdrop overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <div className="hidden md:flex shrink-0 z-30">
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(p => !p)}
          onClose={() => {}}
          isMobile={false}
        />
      </div>

      {/* Mobile sidebar (slide-in from left) */}
      <div className={`fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
          collapsed={false}
          onToggleCollapse={() => {}}
          onClose={() => setMobileOpen(false)}
          isMobile={true}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar activePage={activePage} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          {children}
          {/* <PageContent page={activePage} /> */}
        </main>
      </div>
    </div>
  );
}

export default SidebarPage
