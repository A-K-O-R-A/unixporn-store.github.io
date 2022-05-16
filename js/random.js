/**
 * Randomize a given array and return it
 * @template T Any Array
 * @param {T} sourceArray
 * @returns {T}
 */
function randomize(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];

        sourceArray[j] = sourceArray[i];

        sourceArray[i] = temp;
    }

    return sourceArray;
}

//Load initial content
let random = randomize(dotfiles);
appendDotfiles(random);

document.getElementById('js-sortSwitcher').onclick = async (e) => {
    if (contentLoading) return; //Dont allow randomization while in progress

    contentLoading = true;
    await changeContent(randomize(dotfiles));

    contentLoading = false;
};
