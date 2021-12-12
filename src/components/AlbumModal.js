export default function AlbumModal(props) {

    if (props.album) {
        const tracklist = props.album.tracklist?.map(track => {
            return (
                <li className="font-light text-xl md:text-2xl"><span className="font-medium">{track.position}</span>  &nbsp;{track.title}</li>
            )
        })

        const videos = props.album.videos?.map(video => {
            let link = video.uri.replace("//www.youtube.com/watch?v=", "//www.youtube.com/embed/");
            return (
                <div className="p-2">
                    <iframe src={link}></iframe>
                </div>
            )
        })

        const images = props.album.images?.map(image => {
            return (
                <div className="p-2">
                    <img src={image.uri150} className="rounded" />
                </div>
            )
        })

        return (
            <div className="">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4 md:p-12 cursor-pointer"
                    onClick={(event) => {
                        props.callback();
                        event.stopPropagation();
                    }}
                >
                    <div
                        className="relative bg-gray-900 w-full h-full overflow-auto rounded-lg shadow-lg p-4 md:p-12 text-white cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="">
                            <div className="flex">
                                <div className="mb-8 md:space-y-2 flex-1">
                                    <div className="text-3xl md:text-6xl font-light flex items-center">{props.album.title} <span className="ml-2 md:ml-4 font-thin text-2xl md:text-5xl">({props.album.year})</span></div>
                                    <div className="text-2xl md:text-5xl font-thin">{props.album.artists_sort}</div>
                                </div>
                                <div className="flex items-end flex-col">
                                    <div
                                        className="absolute top-0 right-0 p-2 cursor-pointer"
                                        onClick={(event) => {
                                            props.callback();
                                            event.stopPropagation();
                                        }}
                                    >
                                        <i className="lar la-times-circle text-4xl transform transition-all hover:text-red-500"></i>
                                    </div>
                                    <div className="md:text-4xl italic font-light">{props.album.labels[0].name}</div>
                                    <div className="md:text-3xl font-thin">{props.album.labels[0].catno} </div>
                                </div>
                            </div>
                            <div className="md:flex space-x-12 mb-12">
                                <div className="flex-1">
                                    <div className="bg-gray-700 shadow-inner rounded-lg text-gray-300 p-4 px-8">
                                        <div className="text-3xl mb-2">Track List</div>
                                        <ul>{tracklist}</ul>
                                    </div>
                                </div>
                                {/*<div className="flex-1"></div>*/}
                                <div className="flex-1">
                                    {/*<div className="text-3xl mb-2">&nbsp;</div>*/}
                                    <div className="flex md:flex-wrap -m-2 justify-end">
                                        {images}
                                    </div>
                                </div>
                            </div>
                            <div className="flex -m-2 flex-wrap bg-gray-700 rounded-lg shadow-inner justify-center items-center p-6">
                                {videos}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return <span></span>;
}
