import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen w-screen">
      <Header />

      <main className="p-2 bg-gray-100">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
