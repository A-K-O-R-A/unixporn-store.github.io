let load = false;

document.getElementById('js-sortSwitcher').onclick = async (e) => {
    document.getElementById('themes_container').style.opacity = 0;

    if (!load) {
        load = true;
        await sleep(1000);

        document.getElementById('themes_container').innerHTML = '';
        let random = randomize(dotfiles);
        appendDotfiles(random);

        document.getElementById('themes_container').style.opacity = 1;

        load = false;
    }
};
