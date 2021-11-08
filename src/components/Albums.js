import React from 'react';
import Album from "./Album";

export default class Albums extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {albums} = this.props;
        const albumList = albums.map(album => {
            return(
                <Album key={album._id} album={album} />
            )
        });

        return (
            <div className="h-100 px-4">
                <div className="flex flex-wrap -mx-2 lg:-mx-4">
                    {albumList}
                </div>
            </div>
        );
    }
}
