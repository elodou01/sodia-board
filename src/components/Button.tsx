import Image from "next/image";
import styles from "../styles/Button.module.css";

type Props = {
  label: string;
  onClick?(): void;
  leftIconSrc?: string;
  rightIconSrc?: string;
};

export const Button = ({
  label,
  onClick,
  leftIconSrc,
  rightIconSrc,
}: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {leftIconSrc && (
        <Image
          src={leftIconSrc}
          alt="button left icon"
          width={20}
          height={20}
        />
      )}
      {label}
      {rightIconSrc && (
        <Image
          src={rightIconSrc}
          alt="button right icon"
          width={15}
          height={15}
        />
      )}
    </button>
  );
};
