import { LayoutPageProps } from "./types";

const LayoutPage = ({ children }: LayoutPageProps) => {
  return <section className="text-center, m-0, h-screen">{children}</section>;
};

export { LayoutPage };
