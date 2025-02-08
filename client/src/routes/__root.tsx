import { Icon } from "@iconify/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: Layout,
});

function Layout() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen w-screen">
      <header className="w-full p-4 text-center bg-black text-gray-100">
        <h1 className="text-xl">SI - NEWS</h1>
      </header>

      <main className="p-2">
        <Outlet />
      </main>

      <footer className="w-full p-2 bg-black text-gray-100">
        footer
      </footer>
    </div>
  );
}
