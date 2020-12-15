import Axios from "axios";
import React from "react";

export default function App() {
    const [auth, setAuth] = React.useState<boolean>(false);

    const login = async () => {
        const { data } = await Axios.get("/api/Login");
        setAuth(data.success);
    };
    const check = async () => {
        const { data } = await Axios.get("/api/Check");
        setAuth(data.success);
    };
    const logout = async () => {
        await Axios.get("/api/Logout");
        setAuth(false);
    };

    return (
        <>
            <h1>React TS Boilerplate</h1>
            <div className={"row full-width space-10"}>
                <button onClick={login}>login</button>
                <button onClick={check}>check</button>
                <button onClick={logout}>logout</button>
            </div>
            <div className={"text-center"}>
                {auth ? "😀Authenticated!" : "😑Not Authenticated."}
            </div>
        </>
    );
}
