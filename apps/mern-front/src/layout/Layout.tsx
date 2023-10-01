import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styles from "./layout.module.scss";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
  <>
    <header className={styles.header}>
      <nav>
        <button>
          <Link to="/" replace={true}>Liker des memes</Link>
        </button>
        <button>
          <Link to="/publish" replace={true}>Publier un meme</Link>
        </button>
      </nav>
    </header>
    <main>
      {children}
    </main>
  </>
  )
}