import {useRouteError} from "react-router-dom";
import NotFoundError from "./NotFoundError.jsx";
import ServerError from "./ServerError.jsx";

function DynamicError() {
    const error = useRouteError();
    switch (error.status) {
        case 404:
            return <NotFoundError />;
        case 500:
            return <ServerError />;
    }
}

export default DynamicError;