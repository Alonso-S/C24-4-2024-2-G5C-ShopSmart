import { createContext } from "react";
import { UserContextType } from "../../types/UserContextType";

const UserContext = createContext<UserContextType>({
    id: undefined,
    name: "",
    image: "",
});

export default UserContext;
