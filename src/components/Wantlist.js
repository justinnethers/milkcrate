import React from 'react';
import Album from "./Album";
import {getWantlist} from "../api";

export default class Wantlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: []
        }
    }

    async componentDidMount() {
        const wants = await getWantlist();
        console.log('wantlist', wants);
        this.setState({albums:wants})
    }

    render() {
        const albumList = this.state.albums.map(album => {
            return(
                <Album key={album._id} album={album} />
            )
        });

        return (
            <div className="h-100 px-4">
                <h1 className="text-4xl font-light">Wantlist</h1>
                <div className="flex flex-wrap -mx-2 lg:-mx-4">
                    {albumList}
                </div>
            </div>
        );
    }

}
