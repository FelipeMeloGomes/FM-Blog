const LayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-300">{children}</div>
    </div>
  );
};

export { LayoutPage };
