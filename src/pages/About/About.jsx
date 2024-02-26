// Estilos css
import styles from "./About.module.css";

// imgs
import aboutImg from "./assets/about.jpg";

// components
import TitleParagraph from "./../../components/TitleParagraph/TitleParagraph";
import LayoutPage from "./../../components/LayoutPage/LayoutPage";

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
                        <svg
                            viewBox="55.005 23.8289 333.061 333.0491"
                            width="65"
                            height="65"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                id="Path_2520"
                                data-name="Path 2520"
                                d="M 338.789 307.609 L 289.44 307.609 L 289.44 230.326 C 289.44 211.898 289.111 188.174 263.773 188.174 C 238.07 188.174 234.138 208.253 234.138 228.985 L 234.138 307.604 L 184.788 307.604 L 184.788 148.679 L 232.164 148.679 L 232.164 170.398 L 232.827 170.398 C 242.491 153.881 260.452 144.017 279.57 144.726 C 329.587 144.726 338.809 177.626 338.809 220.426 L 338.789 307.609 Z M 129.106 126.955 C 107.063 126.96 93.281 103.098 104.298 84.006 C 115.319 64.909 142.877 64.909 153.904 83.996 C 156.418 88.35 157.739 93.29 157.739 98.312 C 157.744 114.13 144.923 126.955 129.106 126.955 M 153.781 307.609 L 104.38 307.609 L 104.38 148.679 L 153.781 148.679 L 153.781 307.609 Z M 363.391 23.851 L 79.582 23.851 C 66.17 23.702 55.169 34.446 55.005 47.858 L 55.005 332.844 C 55.164 346.266 66.165 357.02 79.582 356.876 L 363.391 356.876 C 376.839 357.046 387.881 346.292 388.066 332.844 L 388.066 47.837 C 387.876 34.4 376.834 23.656 363.391 23.831"
                                fill="#0b65c2"
                                transform="matrix(1, 0, 0, 1, -7.105427357601002e-15, -3.552713678800501e-15)"
                            ></path>
                        </svg>
                    </a>
                </button>
                <button alt="Github" className={styles.button}>
                    <a
                        href="https://github.com/FelipeMeloGomes/FM-Blog"
                        target="_blank"
                    >
                        <svg
                            class="github"
                            height="65px"
                            width="65px"
                            viewBox="0 0 30 30"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                        </svg>
                    </a>
                </button>
            </div>
            <img src={aboutImg} alt="Garoto mechendo no computador" className={styles.aboutImg} />
        </LayoutPage>
    );
};

export default About;
