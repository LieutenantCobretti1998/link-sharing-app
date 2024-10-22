import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Settings() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    return (
        <main className="relative inline-block text-left"></main>
    );
}

export default Settings;