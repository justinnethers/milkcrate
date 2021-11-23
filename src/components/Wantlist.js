import React from 'react';
import Album from "./Album";
import {getWantlist} from "../api";

export default class Wantlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            loading: false
        }
    }

    async componentDidMount() {
        this.setState({loading: true});
        const wants = await getWantlist();
        console.log('wantlist', wants);
        this.setState({albums: wants});
        this.setState({loading: false});
    }

    render() {
        const albumList = this.state.albums.map(album => {
            return(
                <Album key={album._id} album={album} />
            )
        });

        if (this.state.loading) {
            return (
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
                    <div className="record"></div>
                </div>
            )
        }
        return (
            <div className="h-100 px-4">
                <div className="flex flex-wrap -mx-2 lg:-mx-4">
                    {albumList}
                </div>
            </div>
        );
    }

}
