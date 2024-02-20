// Estilos css
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container__footer}>
            <footer className={styles.footer}>
                Desenvolvido por Felipe Melo &copy;
            </footer>
        </div>
    );
};

export default Footer;
