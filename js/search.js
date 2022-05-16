/**
 * Returns a method that you can use to create your own reusable fuzzy search.
 * @param {Dotfile[]} items
 * @param {string} key
 * @returns {(items: Dotfile[]) => Dotfile[]}
 */
function fuzzy(items, key) {
    return function (query) {
        var words = query.toLowerCase().split(' ');

        return items.filter((item) => {
            var normalizedTerm = item[key].toString().toLowerCase();

            return words.every((word) => {
                return normalizedTerm.indexOf(word) > -1;
            });
        });
    };
}

var searchByTags = fuzzy(dotfiles, 'tags');
var searchByAuthor = fuzzy(dotfiles, 'author');
var searchByTitle = fuzzy(dotfiles, 'title');

/**
 *
 * @param {string} text
 * @return {Dotfile[]}
 */
function fullSearch(text) {
    let tagResults = searchByTags(text);
    let authorResults = searchByAuthor(text);
    let titleResults = searchByTitle(text);

    let rawResult = [...titleResults, ...tagResults, ...authorResults];

    return [...new Set(rawResult)].sort((a, b) => {
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
        return 0;
    });
}

document.getElementById('searchInput').onkeyup = async (e) => {
    let searchText = document.getElementById('searchInput').value;
    let results = fullSearch(searchText);

    if (!contentLoading) {
        contentLoading = true;

        await changeContent(results);

        contentLoading = false;
    }
};
