// import React, { useState } from "react";
import styles from "./profile-image.module.css";

const ProfileImage: React.FC = () => {
    // const [image, setImage] = useState<string>("");

    // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setImage(reader.result as string);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    return (
        <div className={styles.imageContainer}>
            <img
                src="https://kzmjq2i1phr8gmlbizpj.lite.vusercontent.net/placeholder.svg"
                alt="Profile"
                className={styles.profileImage}
            />
            <label htmlFor="imageUpload" className={styles.uploadButton}>
                Change Image
            </label>
            <input
                type="file"
                id="imageUpload"
                accept="image/*"
                // onChange={handleImageUpload}
                className={styles.fileInput}
            />
        </div>
    );
};

export default ProfileImage;
