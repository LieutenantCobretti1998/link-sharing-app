import {resendEmail} from "../API/Login.js";

export const confirmEmailLoader = async ({ params }) => {
    const {email} = params;

    try {
        const {message} = await resendEmail(email);
        return { success: true, message: message };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
