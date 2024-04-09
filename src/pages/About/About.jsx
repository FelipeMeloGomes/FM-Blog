// Estilos css
import styles from "./About.module.css";

// Icons
import { FaGithub, FaLinkedin } from "react-icons/fa6";

// Image
import aboutImg from "./assets/about.webp";

// components
import { TitleParagraph } from "./../../components/TitleParagraph";
import { LayoutPage } from "./../../components/LayoutPage";

const About = () => {
    return (
        <LayoutPage>
            <TitleParagraph
                title="Sobre o FM Blog"
                paragraph="Este projeto consiste em um blog feito com React, salvando os dados no Firebase."
            />

            <div className={styles.containerBtn}>
                <button alt="Linkedim" className={styles.button}>
                    <a
                        href="https://www.linkedin.com/in/felipemelog/"
                        target="_blank"
                    >
                        <FaLinkedin className={styles.icon_linkedin} />
                    </a>
                </button>
                <button alt="Github" className={styles.button}>
                    <a
                        href="https://github.com/FelipeMeloGomes/FM-Blog"
                        target="_blank"
                    >
                        <FaGithub className={styles.icon_github} />
                    </a>
                </button>
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

export default About;
