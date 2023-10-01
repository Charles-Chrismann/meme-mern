import { useEffect, useRef, useState } from "react";
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import styles from "./home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";

export default function Home() {
    const itemsRef = useRef<HTMLDivElement[] | null>([]);
    const [memes, setMemes] = useState<{[key: string]: any}>([]);
    useEffect(() => {
        Promise.all([
            fetch("/api/memes/random"),
            fetch("/api/memes/random"),
            fetch("/api/memes/random"),
            fetch("/api/memes/random")
        ])
        .then((responses) => Promise.all(responses.map((response) => response.json())))
        .then((data) => {
            console.log(data);
            setMemes(data);
        })
    }, [])

    function like() {
        if (itemsRef.current) {
            itemsRef.current[0].style.transform = "translateX(100vw)";
            setTimeout(() => {
                if (itemsRef.current) {
                    // itemsRef.current.shift();
                    setMemes(memes.slice(1));
                }
            }, 1000);
        }
        console.log("like");
    }

    return (
        <div className={styles.gallery}>
            {
                !memes.length ? <span>Loading Memes</span> :
                memes.map((meme: any, i: number) => (
                    <div className={styles.card} key={i} ref={el => itemsRef.current && (itemsRef.current[i] = el!)} >
                        <img className={styles.preview} src={`/uploads/${meme.filename}`} alt="" />
                        <div className={styles.btns}>
                            <button className={classNames(styles.btn, styles.dislike)}><FontAwesomeIcon icon={faThumbsDown} /></button>
                            <button className={classNames(styles.btn, styles.like)}><FontAwesomeIcon icon={faHeart} onClick={like} /></button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}