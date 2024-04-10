export function sortPostsByTitle(posts) {
    return posts && [...posts].sort((a, b) => a.title.localeCompare(b.title));
}
