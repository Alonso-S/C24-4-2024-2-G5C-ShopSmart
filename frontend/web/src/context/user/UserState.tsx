import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { getUserData } from "../../api/profile";

interface UserStateProps {
    children: React.ReactNode;
}

const UserState = ({ children }: UserStateProps) => {
    const [userData, setUserData] = useState({
        id: undefined,
        name: "",
        image: "",
        // other user data...
    });

    useEffect(() => {
        const loadUserData = async () => {
            const data = await getUserData();

            if (
                data.image == null || data.image == undefined ||
                data.image === ""
            ) {
                data.image =
                    "https://kzmjq2i1phr8gmlbizpj.lite.vusercontent.net/placeholder.svg";
            }
            setUserData(data);
        };
        loadUserData();
    }, []);

    return (
        <UserContext.Provider
            value={{
                id: userData.id,
                name: userData.name,
                image: userData.image,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserState;
