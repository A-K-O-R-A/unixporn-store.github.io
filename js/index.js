/**
 * The data for a single setup
 * @typedef {typeof dotfiles[0]} Dotfile
 */

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

/**
 * Returns a promise that resolves after specified amount of ms
 * @param {number} milliseconds
 * @returns {Promise<void>}
 */
function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * @param {Dotfile[]} dotfilesArray Array of dotfiles that should be added to the ui
 */
function appendDotfiles(dotfilesArray) {
    for (let dotfile of dotfilesArray) {
        let header = document.createElement('header');

        let downld = document.createElement('a');
        downld.classList.add('button-child');
        downld.href = dotfile.link;
        downld.innerHTML = 'Download';

        // Desc
        let desc = document.createElement('h3');
        desc.innerHTML = dotfile.description;
        desc.classList.add('theme-desc');
        header.appendChild(desc);

        // Title
        let title = document.createElement('h3');
        title.innerHTML = dotfile.title;
        title.classList.add('theme-title');
        header.appendChild(title);

        // Image
        image = document.createElement('img');
        image.src = dotfile.image;

        // link
        let link = document.createElement('a');
        link.href = dotfile.link;
        link.target = '_blank';
        header.appendChild(link);

        // link-icon
        let linkIcon = document.createElement('i');
        linkIcon.classList.add('fas', 'fa-external-link-alt');
        link.appendChild(linkIcon);

        // Buttons Thingy
        let buttonz = document.createElement('div');
        buttonz.classList.add('buttons');
        buttonz.appendChild(downld);

        // Card
        let dotfile_div = document.createElement('div');
        dotfile_div.classList.add('card');
        dotfile_div.appendChild(header);
        dotfile_div.appendChild(image);
        dotfile_div.appendChild(buttonz);

        document.getElementById('themes_container').appendChild(dotfile_div);
    }
}

let random = randomize(dotfiles);
appendDotfiles(random);
