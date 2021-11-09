import React from 'react';
import Albums from "./Albums";
import {getAlbums, getFolders, getWantlist} from "../api";
import Folders from "./Folders";

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            folders: [],
            filterText: ''
        }
    }

    componentDidMount() {
        this.getFolders();
        this.getAlbums();
    }

    async getAlbums() {
        const albums = await getAlbums();
        console.log('getAlbums', albums);
        this.setState({
            albums: albums
        });
    }

    async getFolders() {
        const folders = await getFolders();
        console.log('getFolders', folders);
        this.setState({
            folders: folders
        });
    }

    async getFolderAlbums(id) {
        const albums = await getAlbums({folderId: id});
        console.log('folderAlbums', albums);
        this.setState({
            albums: albums
        });
    }

    async getWantlist() {
        const albums = await getWantlist();
        console.log('wantlist', albums);
        this.setState({
            albums: albums
        });
    }

    handleFoldersCallback = (value) => {
        if (value === "wantlist") {
            this.getWantlist();
            return;
        }
        this.getFolderAlbums(value);
    }

    render() {
        return (
            <div className="h-100 p-4 lg:p-8">
                <div className="flex">
                    <div className="mt-4">
                        <Folders folders={this.state.folders} parentCallback={this.handleFoldersCallback} />
                    </div>
                    <Albums albums={this.state.albums} />
                </div>
            </div>
        );
    }
}
