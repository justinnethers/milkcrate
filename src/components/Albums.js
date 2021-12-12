import {getAlbums} from "../api";
import Album from "./Album";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Albums(props) {

    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(false);
    const [randomAlbum, setRandomAlbum] = useState(false);

    const params = useParams();
    const folder = params.folder;

    useEffect(() => {
        getAlbumsLocal();
        document.title = "My Albums";
    }, [folder]);

    useEffect(() => {
        if (props.randomize) {
            setRandomAlbum(Math.floor(Math.random() * albums.length));
        } else {
            setRandomAlbum(false);
        }
    }, [props.randomize]);

    async function getAlbumsLocal(page = 1) {
        setLoading(true);
        let {albums, pagination} = await getAlbums({folderId: folder ?? 0, page: page});
        console.log('getAlbums', albums);
        setAlbums(albums);
        setPagination(pagination);
        setLoading(false);
        if (pagination.pages > 1) {
            getRemainingAlbums(pagination.pages);
        }
    }

    async function getRemainingAlbums(pages) {
        for (let page = 2; page < pages+1; page++) {
            let {albums, pagination} = await getAlbums({folderId: folder ?? 0, page: page});
            if (albums) {
                setAlbums(oldAlbums => [...oldAlbums, ...albums]);
            }
        }
    }

    const albumList = albums.filter((album) => {
        if (props.filterText) {
            return album.search.toLowerCase().includes(props.filterText.toLowerCase());
        } else {
            return albums;
        }
    }).map((album, index) => {
        return(
            <Album key={album._id} album={album} index={index} random={randomAlbum} open={index === randomAlbum} />
        )
    });

    let pager = <div>&nbsp;</div>;
    if (pagination.pages > 1) {
        const currentPage = pagination.page;
        const pages = [...Array(pagination.pages)].map((_, i) => {
            const page = i + 1;
            return (
                <div
                    onClick={() => {
                        window.scrollTo({ top: 0 });
                        getAlbumsLocal(page);
                    }}
                    className={`pager-link ${currentPage == page ? 'active' : ''}`}
                >{page}</div>
            );
        });

        pager = (
            <div className="flex space-x-4 w-full justify-center my-4">{pages}</div>
        )
    }

    if (loading) {
        return (
            <div>
                <div className="absolute inset-0 bg-gray-900 bg-opacity-80 flex justify-center items-center">
                    <div className="record"></div>
                </div>
                <div className="h-100 px-4" key={folder}>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                        {albumList}
                    </div>
                </div>
            </div>

        )
    }
    return (
        <div className="h-100 pb-12" key={folder}>

            {/*{pager}*/}
            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                {albumList}
            </div>
            {/*{pager}*/}
        </div>
    );
}
