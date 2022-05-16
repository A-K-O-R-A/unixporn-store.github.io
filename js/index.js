/**
 * The data for a single setup
 * @typedef {typeof dotfiles[0]} Dotfile
 */

let contentLoading = false;

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

/**
 * This changes the content of the Theme Container while doing a transition
 * @param {Dotfile[]} newContent
 */
async function changeContent(newContent) {
    document.getElementById('themes_container').style.opacity = 0;

    //Waiting for transition
    await sleep(200);

    //Change elements
    document.getElementById('themes_container').innerHTML = '';
    appendDotfiles(newContent);

    //Pure visual delay
    await sleep(200);

    document.getElementById('themes_container').style.opacity = 1;
    //Waiting for transition
    await sleep(200);
}
