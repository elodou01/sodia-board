import Image from "next/image";
import styles from "../styles/HomeLeftSide.module.css";
import { Button } from "./Button";

export const HomeLeftSide = () => {
  return (
    <div className={styles.side}>
      <div className={styles.title}>
        Welcome to your <p className={styles.sodia}>social media</p> dashboard
      </div>
      <div className={styles.subtitle}>
        Want to see live usage of your favorite social media?
      </div>
      <div className={styles.buttons}>
        <a
          target="_blank"
          href="https://gist.github.com/AlexisMontagne/6964887537bba43ce8d2ed7dd7a4a85e"
          rel="noopener noreferrer"
        >
          <Button
            label="Check out the initial requirements"
            rightIconSrc="/newtab.png"
          />
        </a>
        <a
          target="_blank"
          href="https://github.com/elodou01/sodia-board"
          rel="noopener noreferrer"
        >
          <Button
            label="Find us on Github"
            leftIconSrc="/github.png"
            rightIconSrc="/newtab.png"
          />
        </a>
      </div>
      <Image
        src="/sodia.png"
        alt="Social media illustration"
        width={600}
        height={350}
      />
    </div>
  );
};
