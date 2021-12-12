import {getAlbumRelease} from "../api";
import {useEffect, useState} from "react";
import AlbumModal from "./AlbumModal";

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

    let albumMarkup = (
        <div className="p-4 lg:p-8 bg-gray-900 text-white rounded shadow-lg cursor-pointer" onClick={() => getAlbumInfo()}>
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
            <div className="w-full">
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
                    <div className="record"></div>
                </div>
                {albumMarkup}
            </div>

        )
    }
    return (
        <div className="w-full">
            {albumMarkup}
            <AlbumModal album={album} callback={() => setAlbum(false)} />
        </div>
    );
}
