class ImageInfo {
    /**
     *
     */
    constructor(public imageData, public timeCreated, public mapCoords, public title: string, public categories: string[]
        , public isPrivate: boolean, public isFavorite: boolean) {


    }
}

export default ImageInfo