import {getAlbumRelease} from "../api";
import {useEffect, useState} from "react";

export default function Album(props) {

    const [album, setAlbum] = useState(false);
    const [loading, setLoading] = useState(false);

    async function getAlbumInfo() {
        setLoading(true);

        const localAlbum = JSON.parse(localStorage.getItem(props.album.id));
        if (localAlbum) {
            setAlbum(localAlbum);
        }
        else {
            const album = await getAlbumRelease(props.album.id);
            setAlbum(album);
            localStorage.setItem(props.album.id, JSON.stringify(album));
        }

        setLoading(false);
    }

    useEffect(() => {
        if (props.open) {
            getAlbumInfo()
        }
    }, [props.open])

    let albumModal = <div className="h-0">&nbsp;</div>;

    if (album) {

        const tracklist = album.tracklist?.map(track => {
            return (
                <li className="font-light text-xl md:text-2xl"><span className="font-medium">{track.position}</span>  &nbsp;{track.title}</li>
            )
        })

        const videos = album.videos?.map(video => {
            let link = video.uri.replace("//www.youtube.com/watch?v=", "//www.youtube.com/embed/");
            return (
                <div className="p-2">
                    <iframe src={link}></iframe>
                </div>
            )
        })

        const images = album.images?.map(image => {
            return (
                <div className="p-2">
                    <img src={image.uri150} className="rounded" />
                </div>
            )
        })

        albumModal = (
            <div className="">
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center p-4 md:p-12 cursor-pointer"
                    onClick={() => setAlbum(false)}
                >
                    <div
                        className="bg-gray-900 w-full h-full overflow-auto rounded-lg shadow-lg p-4 md:p-12 text-white cursor-default"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="">
                            <div className="flex">
                                <div className="mb-8 md:space-y-2 flex-1">
                                    <div className="text-3xl md:text-6xl font-light flex items-center">{album.title} <span className="ml-2 md:ml-4 font-thin text-2xl md:text-5xl">({album.year})</span></div>
                                    <div className="text-2xl md:text-5xl font-thin">{album.artists_sort}</div>
                                </div>
                                <div className="flex items-end flex-col">
                                    <div className="md:text-4xl italic font-light">{album.labels[0].name}</div>
                                    <div className="md:text-3xl font-thin">{album.labels[0].catno} </div>
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

    let albumMarkup = (
        <div className="p-4 lg:p-8 bg-gray-900 text-white rounded shadow-lg m-2 lg:m-4 cursor-pointer" onClick={() => getAlbumInfo()}>
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
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="w-full md:w-1/2 xl:w-1/2">
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
                    <div className="record"></div>
                </div>
                {albumMarkup}
            </div>

        )
    }
    return (
        <div className="w-full md:w-1/2 xl:w-1/2">
            {albumMarkup}
            {albumModal}
        </div>
    );
}
