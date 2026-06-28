import Header from "./Header";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <Header />

      <div
        className="
          h-full
          lg:mt-16
          lg:pt-2
          lg:px-6
        "
      >
        {children}
      </div>
    </div>
  );
}