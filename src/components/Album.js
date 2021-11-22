export default function Album(props) {

    return (
        <div className="w-full md:w-1/2 xl:w-1/2">
            <div className="p-4 lg:p-8 bg-gray-900 text-white rounded shadow-lg m-2 lg:m-4">
                <div className="flex space-x-2">
                    <div className="flex-1 flex flex-col">
                        <div className="text-4xl">{props.album.title}</div>
                        <div className="font-thin text-3xl">{props.album.artist}</div>
                        <div className="flex-1">&nbsp;</div>
                        <div className="italic font-light text-xl">{props.album.genre}</div>
                    </div>
                    <div className="w-1/3">
                        <img
                            className="rounded shadow w-full"
                            alt={props.album.title + " album cover"}
                            src={props.album.cover_image}
                        />
                        {/*<div className="italic text-lg">{props.album.label.name} - {props.album.label.catno}</div>*/}
                        {/*<div className="italic text-lg">{props.album.year}</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}
