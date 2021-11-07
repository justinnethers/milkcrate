import React from 'react';
import Album from "./Album";
import {getAlbums, getFolders} from '../api';
// import "animate.css"

export default class Albums extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            albums: [],
            folders: [],
            filterText: '',
            showForm: false
        }
    }

    componentDidMount() {
        this.getAlbums();
        this.getFolders();
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
        const {albums, filterText, folders} = this.state;
        const albumList = albums.map(album => {
            return(
                <Album key={album._id} album={album} onDelete={(res) => this.setState({ albums: res})} />
            )
        });

        const foldersList = folders.map(folder => {
            return (
                <button
                    onClick={() => this.getFolderAlbums(folder.id)}
                    className="bg-blue-900 text-blue-200 text-lg rounded shadow w-48 hover:bg-blue-700"
                >{folder.name}</button>
            )
        })

        return (
            <div className="h-100 p-4 lg:p-8">
                <div className="flex space-x-4 lg:space-x-8">
                    <input
                        className="w-full p-2 text-xl font-light rounded shadow-inner"
                        value={this.state.filterText}
                        placeholder="Search by artist, album, or genre"
                        onChange={e => this.setState({...this.state, filterText: e.target.value})}
                    />
                </div>
                <div className="flex space-x-8">
                    <div className="w-64 mt-4">
                        <div className="space-y-4">
                            <div className="text-4xl font-thin">Folders</div>
                            {foldersList}
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-2 lg:-mx-4">
                        {albumList}
                    </div>
                </div>
            </div>
        );
    }
}
