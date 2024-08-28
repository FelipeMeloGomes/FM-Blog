import styles from "./About.module.css";
import aboutImg from "./assets/about.webp";
import { TextField } from "../../components/TextField";
import { LayoutPage } from "../../components/LayoutPage";
import { Icon } from "../../components/IconComponent";
import { ButtonProps } from "./types";

const Button = ({ alt, children, ...rest }: ButtonProps) => (
  <button {...rest} className={styles.button} aria-label={alt}>
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

      <div className={styles.containerBtn}>
        <Button alt="Linkedim" className={styles.button}>
          <a
            href="https://www.linkedin.com/in/felipemelog/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="Linkedin" className={styles.icon_linkedin} />
          </a>
        </Button>
        <Button alt="Github" className={styles.button}>
          <a
            href="https://github.com/FelipeMeloGomes/FM-Blog"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="Github" className={styles.icon_github} />
          </a>
        </Button>
      </div>
      <figure>
        <img
          src={aboutImg}
          loading="lazy"
          alt="Garoto mechendo no computador"
          className={styles.aboutImg}
        />
      </figure>
    </LayoutPage>
  );
};

export { About };
