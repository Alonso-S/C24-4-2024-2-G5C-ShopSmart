import { updateUserProfile } from "../../api/profile";
import UserProfile from "../../types/UserProfile";
import styles from "./profile-info.module.css";

interface ProfileInfoProps {
    currentProfile: UserProfile;
    savedProfile: UserProfile;
    setCurrentProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
    isEditing: boolean;
    setEditingStatus: (status: boolean) => void;
    setSavedProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ProfileInfo = (
    {
        currentProfile,
        savedProfile,
        setCurrentProfile,
        isEditing,
        setEditingStatus,
        setSavedProfile,
    }: ProfileInfoProps,
) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateUserProfile(currentProfile);
            console.log(currentProfile);
            setSavedProfile(currentProfile);
            setEditingStatus(false);
            console.log("Profile updated:", currentProfile);
        } catch (error) {
            setCurrentProfile(savedProfile);
            console.error("Failed to update profile:", error);
        }
    };

    const handleCancel = () => {
        setCurrentProfile(savedProfile);
        setEditingStatus(false);
    };

    return (
        <div className={styles.infoContainer}>
            <h1 className={styles.heading}>Profile Information</h1>
            {isEditing
                ? (
                    <form onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={currentProfile.name}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={currentProfile.email}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                value={currentProfile.phone}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={currentProfile.address}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="province">Province:</label>
                            <input
                                type="text"
                                id="province"
                                name="province"
                                value={currentProfile.province}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="district">District:</label>
                            <input
                                type="text"
                                id="district"
                                name="district"
                                value={currentProfile.district}
                                onChange={handleInputChange}
                                className={styles.input}
                            />
                        </div>
                        <button type="submit" className={styles.saveButton}>
                            Save
                        </button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </form>
                )
                : (
                    <>
                        <div className={styles.infoField}>
                            <label>Name</label>
                            <p>{currentProfile.name}</p>
                        </div>
                        <div className={styles.infoField}>
                            <label>Email</label>
                            <p>{currentProfile.email}</p>
                        </div>
                        <div className={styles.infoField}>
                            <label>Phone</label>
                            <p>{currentProfile.phone}</p>
                        </div>
                        <div className={styles.infoField}>
                            <label>Address</label>
                            <p>{currentProfile.address}</p>
                        </div>
                        <div className={styles.infoField}>
                            <label>Province</label>
                            <p>{currentProfile.province}</p>
                        </div>
                        <div className={styles.infoField}>
                            <label>District</label>
                            <p>{currentProfile.district}</p>
                        </div>
                        <button
                            className={styles.editButton}
                            onClick={() => setEditingStatus(true)}
                        >
                            Edit Profile
                        </button>
                    </>
                )}
        </div>
    );
};

export default ProfileInfo;
