import React from 'react';

export default class Folders extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {folders} = this.props;
        const foldersList = folders.map(folder => {
            return (
                <button
                    onClick={() => this.props.parentCallback(folder.id)}
                    className="bg-blue-900 text-blue-200 text-2xl p-2 rounded shadow w-48 hover:bg-blue-700"
                >{folder.name}</button>
            )
        })

        return (
            <div className="w-64 mt-4">
                <div className="space-y-4">
                    <div className="text-4xl font-light">Folders</div>
                    {foldersList}
                </div>
            </div>
        );
    }
}
