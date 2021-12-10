import React from 'react';
import Albums from "./Albums";
import Folders from "./Folders";
import {Route, Routes} from "react-router-dom";
import Wantlist from "./Wantlist";

export default class Wrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            random: false
        }
    }

    render() {
        return (
            <div className="">
                <div className="flex w-full">
                    <div className="w-1/6">
                        <Folders folders={this.state.folders} callback={() => this.setState({random:false})} />
                        <span
                            className="p-4 text-white text-3xl font-light hover:text-gray-900 transition-all cursor-pointer"
                            onClick={() => this.setState({random: Math.random()})}
                        >
                            <i className="las la-dice-d6"></i> Random Album
                        </span>
                    </div>
                    <div className="flex-1">
                        <Routes>
                            <Route
                                path="/"
                                element={<Albums randomize={this.state.random} />}
                            >
                                <Route
                                    exact
                                    path=":folder"
                                    element={<Albums randomize={this.state.random} />}
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
