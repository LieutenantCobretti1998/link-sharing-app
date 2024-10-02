import {getLink} from "../API/DataFetchingApi.js";

export async function editLinkLoader({params}) {

    const {id} = params;
    if (id) {
        return await getLink(id);
    } else {
        return null;
    }
}