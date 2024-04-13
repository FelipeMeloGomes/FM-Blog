const SortPost = (posts) => {
    return posts && [...posts].sort((a, b) => a.title.localeCompare(b.title));
};

export default SortPost;
