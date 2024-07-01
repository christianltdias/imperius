import { ReactNode } from "react";
import styles from "./card.module.sass";

type Props = {
  children?: ReactNode;
  img?: string;
};

export default function Card({ children, img }: Props) {
  return (
    <div className={styles["card-container"]}>
      {img && (
        <div className={styles["image-container"]}>
          <img src={img} alt="home" className={styles["card-img"]} />
          <div className={styles["card-img-shadow"]}></div>
        </div>
      )}
      <div className={styles["card-content"]}>{children}</div>
    </div>
  );
}
