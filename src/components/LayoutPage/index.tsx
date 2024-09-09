import { LayoutPageProps } from "./types";

const LayoutPage = ({ children }: LayoutPageProps) => {
  return (
    <section className="text-center, m-0, mx-auto, h-screen">
      {children}
    </section>
  );
};

export { LayoutPage };
