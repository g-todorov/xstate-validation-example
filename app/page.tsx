import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={styles.main}>
      <Link href={"default-values"}>Default values example</Link>
      <Link href={"values"}>Values example</Link>
    </main>
  );
}
