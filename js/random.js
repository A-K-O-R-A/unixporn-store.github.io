let load = false;

document.getElementById('js-sortSwitcher').onclick = async (e) => {
    document.getElementById('themes_container').style.opacity = 0;

    if (load) return; //Dont allow randomization while in progress

    load = true;
    //Waiting for transition
    await sleep(200);

    document.getElementById('themes_container').innerHTML = '';
    let random = randomize(dotfiles);
    appendDotfiles(random);

    //Pure visual delay
    await sleep(500);

    document.getElementById('themes_container').style.opacity = 1;
    //Waiting for transition
    await sleep(200);

    load = false;
};
