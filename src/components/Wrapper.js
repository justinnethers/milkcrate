import React from 'react';
import Albums from "./Albums";
import {getFolders} from "../api";
import Folders from "./Folders";
import {Route, Routes} from "react-router-dom";
import Wantlist from "./Wantlist";

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            folders: [],
            filterText: ''
        }
    }

    componentDidMount() {
        this.getFolders();
    }

    async getFolders() {
        const folders = await getFolders();
        console.log('getFolders', folders);
        this.setState({
            folders: folders
        });
    }

    handleFoldersCallback = (value) => {
        this.getFolderAlbums(value);
    }

    render() {
        return (
            <div className="">
                <div className="flex w-full">
                    <div className="w-1/6">
                        <Folders folders={this.state.folders} parentCallback={this.handleFoldersCallback} />
                    </div>
                    <div className="flex-1">
                        <Routes>
                            <Route
                                path="/"
                                element={<Albums />}
                            >
                                <Route
                                    exact
                                    path=":folder"
                                    element={<Albums />}
                                />
                            </Route>
                            <Route
                                exact path="/wantlist"
                                element={<Wantlist />}
                            />
                        </Routes>
                    </div>
                </div>
            </div>
        );
    }
}
