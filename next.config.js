module.exports = {
    future: {
        webpack5: true,
    },
    async rewrites() {
        return [
            {
                source: '/kbhms/images/:id.png',
                destination: 'https://kbhmaskine.cloudretailsystems.dk/api/media/MediaItem/GetMediaItemStream?id=:id',
            },
        ];
    },
};
