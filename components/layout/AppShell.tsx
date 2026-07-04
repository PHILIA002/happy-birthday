import Header from "./Header";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Header />

      <div className="h-full lg:mt-18 lg:px-8">
        {children}
      </div>
    </div>
  );
}