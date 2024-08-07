import { useId } from "react";
import styles from "./switch.module.sass";
import { CommonColors } from "../../../../types/global.types";

export type SwitchProps = {
  value: boolean;
  onChange: (e: boolean) => void;
  children?: string;
  color?: CommonColors;
  disabled?: boolean;
  colored?: boolean;
};

export default function Switch({
  children,
  value,
  onChange,
  color = "info",
  disabled = false,
  colored = false,
}: SwitchProps) {
  const id = useId();
  return (
    <div className={styles["container"]}>
      <input
        className={styles[color]}
        type="checkbox"
        disabled={disabled}
        checked={value}
        onChange={() => onChange(!value)}
      />
      <label htmlFor={id} className={colored ? styles["colored"] : ''}>{children}</label>
    </div>
  );
}
