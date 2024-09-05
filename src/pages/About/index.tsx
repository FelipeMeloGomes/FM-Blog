import aboutImg from "./assets/about.webp";
import { TextField } from "../../components/TextField";
import { LayoutPage } from "../../components/LayoutPage";
import { Icon } from "../../components/IconComponent";
import { ButtonProps } from "./types";

const Button = ({ alt, children, ...rest }: ButtonProps) => (
  <button
    {...rest}
    className="bg-white border-none rounded-full shadow-md hover:scale-150 hover:rotate-[-360deg] hover:translate-y-[-1em] hover:shadow-[0_0_20px_rgba(29,161,242,0.5)] transition-transform duration-500 w-16 h-16 flex items-center justify-center perspective-[500px]"
    aria-label={alt}
  >
    {children}
  </button>
);

const About = () => {
  return (
    <LayoutPage>
      <TextField
        title="Sobre o FM Blog"
        paragraph="Este projeto consiste em um blog feito com React, salvando os dados no Firebase."
      />

      <div className="mt-4 flex gap-8 justify-center">
        <Button
          alt="Linkedim"
          className="bg-white border-none rounded-full shadow-md hover:scale-150 hover:rotate-[-360deg] hover:translate-y-[-1em] hover:shadow-[0_0_20px_rgba(29,161,242,0.5)] transition-transform duration-500 w-16 h-16 flex items-center justify-center perspective-[500px]"
        >
          <a
            href="https://www.linkedin.com/in/felipemelog/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              name="Linkedin"
              className="w-16 h-16 text-[#0b65c2] filter drop-shadow-md hover:scale-150 transition-transform duration-500"
            />
          </a>
        </Button>
        <Button
          alt="Github"
          className="bg-white border-none rounded-full shadow-md hover:scale-150 hover:rotate-[-360deg] hover:translate-y-[-1em] hover:shadow-[0_0_20px_rgba(29,161,242,0.5)] transition-transform duration-500 w-16 h-16 flex items-center justify-center perspective-[500px]"
        >
          <a
            href="https://github.com/FelipeMeloGomes/FM-Blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon
              name="Github"
              className="w-16 h-16 text-[#080808] filter drop-shadow-md hover:scale-150 transition-transform duration-500"
            />
          </a>
        </Button>
      </div>
      <figure className="flex justify-center">
        <img
          src={aboutImg}
          loading="lazy"
          alt="Garoto mechendo no computador"
          className=" mt-4 w-[400px] max-w-[90%] animate-float"
        />
      </figure>
    </LayoutPage>
  );
};

export { About };
