/**
 * Returns a method that you can use to create your own reusable fuzzy search.
 * @template T
 * @param {T[]} items
 * @param {string} key
 * @returns {(items: T[]) => T[]}
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

document.getElementById('searchInput').onkeyup = (e) => {
    let value = document.getElementById('searchInput').value;

    let tagResults = searchByTags(value);
    let authorResults = searchByAuthor(value);

    let rawResult = [...searchByTitle(value), ...tagResults, ...authorResults];

    let result = [...new Set(rawResult)];

    document.getElementById('themes_container').style.opacity = 0;

    if (!contentLoading) {
        contentLoading = true;

        changeContent(result);

        contentLoading = false;
    }
};
