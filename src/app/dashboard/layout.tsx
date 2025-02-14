import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar (Fixed) */}
      <div className="w-[280px] bg-white shadow-lg">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
