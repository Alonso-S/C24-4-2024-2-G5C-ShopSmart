import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
const AuthForm = () => {
    const [isActive, setIsActive] = useState(true);

    const toggleForm = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            {isActive
                ? <LoginForm toggleForm={toggleForm} />
                : <RegisterForm toggleForm={toggleForm} />}
        </>
    );
};

export default AuthForm;
