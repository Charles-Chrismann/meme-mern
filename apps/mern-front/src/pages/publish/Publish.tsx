import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { FileUploader } from 'react-drag-drop-files';
import styles from './publish.module.scss';

const fileTypes = ["JPG", "PNG", "GIF"];

function DropZone() {
    return (
        <div className={styles.dropZone}>
            <p>Drag and drop your image here</p>
            <p>Or</p>
            <p>Click to browse your files</p>
        </div>
    )
}


export default function Publish() {
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (fileUploaded: File) => {
        setFile(fileUploaded);
    };

    function saveMeme() {
        const formData = new FormData();
        console.log(file);
        formData.append("file", file as File);
        fetch("/api/memes", {
            method: "POST",
            body: formData
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    return (
        <div className={styles.publish}>
            <div className={classNames(styles.card, {[styles.pointer]: file})}>
                <h1 className={styles.h1}>Publier un meme</h1>
                <div className={styles.file}>
                    {file ? <img className={styles.preview} src={URL.createObjectURL(file)} alt="" /> : <FileUploader children={<DropZone/>} handleChange={handleChange} name="file" types={fileTypes} />}
                </div>
                <div className={styles.btns}>
                    <button className={classNames(styles.btn, styles.dislike)}><FontAwesomeIcon icon={faThumbsDown} /></button>
                    <button className={classNames(styles.btn, styles.like)}><FontAwesomeIcon icon={faHeart} /></button>
                </div>
            </div>
            <button disabled={!file} className={styles["publish-btn"]} onClick={saveMeme}>Publier un meme</button>
        </div>
    )
}