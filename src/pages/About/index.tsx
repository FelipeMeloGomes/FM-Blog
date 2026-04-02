import { AboutButton } from "../../components/AboutButton";
import { LayoutPage } from "../../components/LayoutPage";
import aboutImg from "./assets/about.webp";

const About = () => {
  return (
    <LayoutPage>
      <div className="text-center space-y-4 animate-slide-in-from-bottom-4 opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-foreground">
          Sobre o <span className="text-primary">FM Blog</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Um blog moderno feito com React e Firebase. Compartilhe suas ideias com o mundo.
        </p>
      </div>

      <div className="flex justify-center gap-6 animate-slide-in-from-bottom-4 opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
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

      <div className="mt-6 flex justify-center animate-slide-in-from-bottom-4 opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <img
            src={aboutImg}
            alt="Garoto mexendo no computador"
            loading="lazy"
            className="w-full max-w-md object-cover rounded-2xl animate-float"
            style={{ width: "min(90%, 400px)" }}
          />
        </div>
      </div>
    </LayoutPage>
  );
};

export default About;
