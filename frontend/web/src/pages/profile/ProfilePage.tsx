import { useEffect, useState } from "react";
import styles from "./profile-page.module.css";
import ProfileImage from "../../components/images/profile-image/ProfileImage";
import ProfileInfo from "../../components/profile-info/ProfileInfo";
import { getUserProfile } from "../../api/profile";
import Footer from "../../components/footer/Footer";
import UserProfile from "../../types/UserProfile";

const ProfilePage = () => {
    const defaultProfile = {
        name: "",
        email: "",
        phone: "",
        address: "",
        province: "",
        district: "",
    };
    const [isEditing, setEditingStatus] = useState(false);

    const [currentProfile, setCurrentProfile] = useState<UserProfile>(
        defaultProfile,
    );
    const [savedProfile, setOriginalProfile] = useState<UserProfile>(
        defaultProfile,
    );

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setCurrentProfile(data);
                setOriginalProfile(data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <>
            <main className={styles.container}>
                <div className={styles.profileCard}>
                    <ProfileImage />
                    <ProfileInfo
                        currentProfile={currentProfile}
                        savedProfile={savedProfile}
                        isEditing={isEditing}
                        setCurrentProfile={setCurrentProfile}
                        setEditingStatus={setEditingStatus}
                        setSavedProfile={setOriginalProfile}
                    />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ProfilePage;
