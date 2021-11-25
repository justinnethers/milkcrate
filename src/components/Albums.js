import {getAlbums} from "../api";
import Album from "./Album";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

export default function Albums() {

    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(false);
    const [filterText, setFilterText] = useState('');

    const params = useParams();
    const folder = params.folder;

    useEffect(() => {
        getAlbumsLocal();
        document.title = "My Albums";
    }, [folder]);

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
        if (filterText) {
            return album.search.toLowerCase().includes(filterText.toLowerCase());
        } else {
            return albums;
        }
    }).map(album => {
        return(
            <Album key={album._id} album={album} />
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
                    <div className="flex flex-wrap -mx-2 lg:-mx-4">
                        {albumList}
                    </div>
                </div>
            </div>

        )
    }
    return (
        <div className="h-100 px-4" key={folder}>
            <div className="my-4">
                <input
                    placeholder="search collection..."
                    className="w-full p-2 text-xl rounded shadow-inner"
                    onChange={e => setFilterText(e.target.value)}
                />
            </div>
            {/*{pager}*/}
            <div className="flex flex-wrap -mx-2 lg:-mx-4">
                {albumList}
            </div>
            {/*{pager}*/}
        </div>
    );
}
