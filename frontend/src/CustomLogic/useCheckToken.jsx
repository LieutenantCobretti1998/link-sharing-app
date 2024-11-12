import {useEffect} from 'react';
import {checkToken} from "../API/Login.js";
import {useNavigate, useParams} from "react-router-dom";

function UseCheckToken() {
    const {token} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        async function validateToken() {
            try {
               const response = await checkToken(token);
                if (!response.ok) {
                    navigate("/login", { replace: true });
                }
            } catch (error) {
                navigate("/login", { replace: true });
            }
        }
        validateToken();
    }, [token, navigate]);
}

export default UseCheckToken;