import {getAlbums} from "../api";
import Album from "./Album";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Albums() {

    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const folder = params.folder;

    useEffect(() => {
        getAlbumsLocal();
    }, [folder]);

    async function getAlbumsLocal() {
        setLoading(true);
        const albums = await getAlbums({folderId: folder ?? 0});
        console.log('getAlbums', albums);
        setAlbums(albums);
        setLoading(false);
    }

    const albumList = albums.map(album => {
        return(
            <Album key={album._id} album={album} />
        )
    });

    if (loading) {
        return (
            <div>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                    <div className="record"></div>
                </div>
                <div className="h-100 px-4" key={folder}>
                    <div className="flex flex-wrap -mx-2 lg:-mx-4">
                        {albumList}
                    </div>
                </div>
            </div>

        )
    }
    return (
        <div className="h-100 px-4" key={folder}>
            <div className="flex flex-wrap -mx-2 lg:-mx-4">
                {albumList}
            </div>
        </div>
    );
}
