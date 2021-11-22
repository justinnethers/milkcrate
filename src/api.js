const {Discojs} = require("discojs");

const client = new Discojs({
    userToken: 'hbuQtCjCEpmkBLsECsuqPKCNnsHajJjTrbfPvgsA'
});

export const getAlbums = (params) => {
    let folderId = 0;
    if (params?.folderId) {
        folderId = params.folderId;
    }
    return client.listItemsInFolderForUser('justinnethers', folderId, {by:"artist"})
        .then(res => {
            console.log('res', res.releases);
            return buildAlbumResponse(res.releases);
        });
}

export const getFolders = (params) => {
    return client.listFolders()
        .then(res => {
            console.log('folders', res.folders);
            return res.folders;
        })
}

export const getWantlist = () => {
    return client.getWantlist()
        .then(res => {
            console.log('wantlist', res);
            return buildAlbumResponse(res.wants);
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

function buildAlbumResponse(data) {
    return data.map(album => {
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
}