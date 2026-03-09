import { useState } from "react";
import styles from "./LogoUploadPage.module.css";
import { apiFetch } from "../../../../utils/api";

const LogoUploadPage = () => {
  const [fileName, setFileName] = useState("");
  const [fileLogo, setFileLogo] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!fileName || !fileLogo) {
      setMessage("File name and logo are required");
      return;
    }

    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("fileLogo", fileLogo);

    try {
        const data = await apiFetch("/logo", {
            method: "POST",
            body: formData,
    });

        setMessage(data.message || "Upload successful");
    } catch (error) {
        console.error(error);
        setMessage("Upload failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Upload Logo</div>

      <div className={styles.formGroup}>
        <label className={styles.label}>File Name</label>
        <input
          className={styles.input}
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Select Image</label>
        <input
          className={styles.fileInput}
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFileLogo(e.target.files ? e.target.files[0] : null)
          }
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.button} onClick={handleUpload}>
          Upload
        </button>
      </div>

      {message && <div className={styles.message}>{message}</div>}
    </div>
  );
};

export default LogoUploadPage;