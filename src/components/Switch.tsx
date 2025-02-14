import styles from "../styles/Switch.module.css";

type Props = {
  onClick(checked: boolean): void;
  optionLeft?: string;
  optionRight?: string;
  checked?: boolean;
};

export const Switch = ({
  onClick,
  checked,
  optionLeft,
  optionRight,
}: Props) => {
  return (
    <div className={styles.switchWithLabels}>
      <label htmlFor="switch" style={{ opacity: checked ? "0.7" : "1" }}>
        {optionLeft}
      </label>
      <label className={styles.switch}>
        <input id="switch" type="checkbox" onClick={() => onClick(!checked)} />
        <span className={styles.slider} />
      </label>
      <label htmlFor="switch" style={{ opacity: checked ? "1" : "0.7" }}>
        {optionRight}
      </label>
    </div>
  );
};
