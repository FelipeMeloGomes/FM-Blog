import { AboutButton } from "../../components/AboutButton";
import { LayoutPage } from "../../components/LayoutPage";
import aboutImg from "./assets/about.webp";

const About = () => {
  return (
    <LayoutPage>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">Sobre o FM Blog</h1>
        <p className="text-muted-foreground">
          Este projeto consiste em um blog feito com React, salvando os dados no Firebase.
        </p>
      </div>
      <div className="mt-4 flex justify-center gap-8">
        <AboutButton
          alt="LinkedIn"
          iconName="Linkedin"
          iconColor="#0b65c2"
          href="https://www.linkedin.com/in/felipemelog/"
        />
        <AboutButton
          alt="Github"
          iconName="Github"
          iconColor="#080808"
          href="https://github.com/FelipeMeloGomes/FM-Blog"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <img
          src={aboutImg}
          alt="Garoto mexendo no computador"
          loading="lazy"
          className="w-full max-w-md object-cover animate-float"
          style={{ width: "min(90%, 400px)" }}
        />
      </div>
    </LayoutPage>
  );
};

export default About;
