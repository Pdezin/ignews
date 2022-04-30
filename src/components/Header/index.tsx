import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import ActiveLink from "../ActiveLink";

export function Header() {
  const { asPath } = useRouter();
  return (
    <header className={styles.HeaderContainer}>
      <div className={styles.HeaderContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.Active} href="/">
            <a>Home</a>
          </ActiveLink>
          {/* prefetch traz links a página já pré carregada */}
          <ActiveLink activeClassName={styles.Active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
