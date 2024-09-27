import {useMutation} from "@tanstack/react-query";
import getLinks from "../../GetLogic/GetMutation.js";
import {useEffect, useState} from "react";
import Spinner from "../../UI/Spinner.jsx";


function AllLinks() {
    const mutation = useMutation({
        mutationFn: getLinks,
        onSuccess: (data) => {
            setLinks(data);
        }
    });
    useEffect(() => {
        mutation.mutate();
    }, []);
    if (mutation.isLoading) {
        return <Spinner />;
    } else {
        const links = mutation.data;
        return (
            <section className=" w-full gap-10 h-min flex flex-col bg-white pl-10 pt-10 pb-10 rounded-md border-light-grey">
                {links.map((link, index) => (
                    <div key={index} className="grid-item">
                        <h3>{link.title}</h3>
                        <p>{link.description}</p>
                    </div>
                ))}
            </section>
        )
    }
}

export default AllLinks;