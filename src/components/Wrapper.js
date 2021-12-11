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
            <div className="flex flex-col h-full overflow-hidden">
                <div className="flex w-full h-full">
                    <div className="flex flex-col w-1/5">
                        <Folders folders={this.state.folders} callback={() => this.setState({random:false})} />
                        <span
                            className="absolute bottom-0 left-0 p-4 text-white text-3xl font-light hover:text-gray-900 transition-all cursor-pointer"
                            onClick={() => this.setState({random: Math.random()})}
                        >
                            <i className="las la-dice-d6"></i> Random Album
                        </span>
                    </div>
                    <div className="flex flex-col flex-1 pr-4">
                        <div className="my-4">
                            <input
                                placeholder="search collection..."
                                className="w-full p-2 text-xl rounded shadow-inner"
                                onChange={e => this.setState({filterText: e.target.value})}
                            />
                        </div>
                        <div className="overflow-y-auto overflow-x-hidden">
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Albums filterText={this.state.filterText} randomize={this.state.random} />}
                                >
                                    <Route
                                        exact
                                        path=":folder"
                                        element={<Albums filterText={this.state.filterText} randomize={this.state.random} />}
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
            </div>
        );
    }
}
