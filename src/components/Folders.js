import React from 'react';
import {Link, NavLink} from "react-router-dom";

export default function Folders(props) {

    const {folders} = props;
    const foldersList = folders.map(folder => {
        return (
            <NavLink
                // onClick={() => props.parentCallback(folder.id)}
                to={{ pathname: `/${folder.id}`}}
                key={folder.id}
                className="block hover:text-gray-900 transition-all"
            >
                <div className="text-3xl font-light">
                    {folder.name} <span className="text-xl">({folder.count})</span>
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
            >Wantlist</NavLink>
        </div>
    );
}
