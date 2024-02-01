import { PropsWithChildren } from "react";
import { Header } from "../Header";
import styles from "./layout.module.scss";
import { Footer } from "../Footer";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.wrap}>
      <Header />
      <div className={styles.layout}>{children}</div>
      <Footer />
    </div>
  );
};
