import React from 'react';
import Albums from "./Albums";
import {getAlbums, getFolders} from "../api";

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

    render() {
        const {folders} = this.state;
        const foldersList = folders.map(folder => {
            return (
                <button
                    onClick={() => this.getFolderAlbums(folder.id)}
                    className="bg-blue-900 text-blue-200 text-2xl p-2 rounded shadow w-48 hover:bg-blue-700"
                >{folder.name}</button>
            )
        })

        return (
            <div className="h-100 p-4 lg:p-8">
                <div className="flex">
                    <div className="w-64 mt-4">
                        <div className="space-y-4">
                            <div className="text-4xl font-light">Folders</div>
                            {foldersList}
                        </div>
                    </div>
                    <Albums albums={this.state.albums} />
                </div>
            </div>
        );
    }
}
