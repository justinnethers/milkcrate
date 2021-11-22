import React from 'react';
import {Link} from "react-router-dom";

export default function Folders(props) {

    const {folders} = props;
    const foldersList = folders.map(folder => {
        return (
            <Link
                // onClick={() => props.parentCallback(folder.id)}
                to={{ pathname: `/${folder.id}`}}
                key={folder.id}
                className="bg-blue-900 text-blue-200 font-light text-2xl p-2 rounded shadow w-48 hover:bg-blue-700"
            >{folder.name} <span className="text-base font-thin">({folder.count})</span></Link>
        )
    })

    return (
        <div className="space-y-4">
            <div className="text-4xl font-light">Folders</div>
            {foldersList}
            <Link
                to="/wantlist"
                className="block bg-blue-900 text-blue-200 text-2xl p-2 rounded shadow w-48 hover:bg-blue-700"
            >Wantlist</Link>
        </div>
    );
}
