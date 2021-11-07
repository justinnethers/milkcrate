const {Discojs} = require("discojs");

const client = new Discojs({
    userToken: 'hbuQtCjCEpmkBLsECsuqPKCNnsHajJjTrbfPvgsA'
});

export const getAlbums = (params) => {
    let folderId = 0;
    if (params?.folderId) {
        folderId = params.folderId;
    }
    return client.listItemsInFolderForUser('justinnethers', folderId)
        .then(res => {
            console.log('res', res.releases);
            let albums = res.releases.map(album => {
                return {
                    id: album.id,
                    artist: album.basic_information.artists[0].name,
                    title: album.basic_information.title,
                    genre: album.basic_information.genres.join(", "),
                    cover_image: album.basic_information.cover_image,
                    label: album.basic_information.labels[0],
                    year: album.basic_information.year,
                }
            });
            console.log('albums', albums);
            return albums;
        });
}

export const getFolders = (params) => {
    return client.listFolders()
        .then(res => {
            console.log('folders', res.folders);
            return res.folders;
        })
}

export const createFolder = (name) => {
    return client.createFolder(name)
        .then(res => {
            console.log('createFolder', res);
        });
}

export const deleteAlbum = (params) => {
    return fetch('/albums/' + params.album._id, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(res => {
            return res;
        })
}
