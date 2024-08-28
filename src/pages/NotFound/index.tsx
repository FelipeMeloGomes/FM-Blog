import styles from "./NotFound.module.css";
import { TextField } from "../../components/TextField";
import NotFoundImg from "./assets/NotFoundImg.webp";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <TextField
        color="black"
        title="404"
        paragraph="Página Não Encontrada Desculpe."
      />
      <div className={styles.containerBtn}>
        <Link to="/" className="btn btn-outline">
          Home
        </Link>
      </div>
      <div className={styles.center}>
        <figure>
          <img
            className={styles.containerImg}
            src={NotFoundImg}
            alt="not found"
            loading="lazy"
          />
        </figure>
      </div>
    </div>
  );
};

export { NotFound };
