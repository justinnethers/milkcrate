import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {getFolders} from "../api";

export default function Folders(props) {

    const [folders, setFolders] = useState(JSON.parse(localStorage.getItem('folders')) ?? []);

    useEffect(() => {

        async function getFoldersLocal() {
            let folders = await getFolders();
            console.log('getFolders', folders);
            setFolders(folders);
            localStorage.setItem('folders', JSON.stringify(folders));
        }

        getFoldersLocal();

    }, []);

    if (!folders.length) {
        return (
            <span></span>
        )
    }
    // const {folders} = props;
    const foldersList = folders.map(folder => {
        let icon = '';
        if (folder.name === "Christmas") {
            icon = (
                <span>
                    <i className="text-green-600 las la-holly-berry"></i>&nbsp;
                </span>
            );
        } else {
            icon = (
                <span>
                    <i className="text-black las la-record-vinyl"></i>&nbsp;
                </span>
            )
        }
        return (
            <NavLink
                // onClick={() => props.parentCallback(folder.id)}
                to={{ pathname: `/${folder.id}`}}
                key={folder.id}
                className="block hover:text-gray-900 transition-all"
            >
                <div
                    className="text-3xl font-light"
                    onClick={(event) => {
                        props.callback();
                        event.stopPropagation();
                    }}
                >
                    {icon}{folder.name} <span className="text-xl">({folder.count})</span>
                </div>
            </NavLink>
        )
    })

    return (
        <div className="p-4 text-white">
            <div className="text-5xl mb-4">Folders</div>
            <div className="space-y-2 mb-4">
                {foldersList}
            </div>
            <NavLink
                to="/wantlist"
                className="text-3xl font-light hover:text-gray-900 transition-all"
            >
                <i className="las la-stream text-gray-800"></i> Wantlist
            </NavLink>
        </div>
    );
}
