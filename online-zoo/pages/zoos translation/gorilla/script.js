'use strict';

//cams
const cams = document.querySelectorAll('.cam');
const mainCam = document.querySelector('.main-camera').childNodes[1];
const imgs = {
    cam1: '../../../assets/images/panda_cam1.jpg',
    cam2: '../../../assets/images/panda_cam2.jpg',
    cam3: '../../../assets/images/panda_cam3.jpg',
    cam4: '../../../assets/images/panda_cam2.jpg',
    cam5: '../../../assets/images/panda_cam3.jpg'
}

if (cams.length > 0) {
    for (let i = 0; i < cams.length; i++) {
        const cam = cams[i];
        cam.addEventListener("click", function (e) {
            let link = cam.querySelector('.cam-link').getAttribute('href');
            let mainLink = mainCam.getAttribute('src');
            let alt = cam.querySelector('.cam-img').getAttribute('alt');
            let mainAlt = mainCam.getAttribute('alt');
            cam.querySelector('.cam-link').setAttribute('href', mainLink);
            mainCam.setAttribute('src', link);
            cam.querySelector('.cam-img').setAttribute('alt', mainAlt);
            mainCam.setAttribute('alt', alt);
            cam.querySelector('.cam-img').setAttribute('src', imgs[mainAlt]);
            e.preventDefault();
        });
    }
}

//spoilers
const spoilers = document.querySelectorAll('.info_btn-active');
let prevSpoiler = undefined;

function closeSpoiler(spoiler) {
    spoiler[1].querySelector('.plus').style.display = 'inline';
    spoiler[1].querySelector('.minus').style.background = '#080029';
    spoiler[1].querySelector('.more_btn-title').style.color = '#080029';
    spoiler[3].style.display = 'none';
    spoiler[5].style.background = '#d3d3d3';
}

function openSpoiler(spoiler) {
    spoiler[1].querySelector('.plus').style.display = 'none';
    spoiler[1].querySelector('.minus').style.background = '#609FFF';
    spoiler[1].querySelector('.more_btn-title').style.color = '#609FFF';
    spoiler[3].style.display = 'inline';
    spoiler[5].style.background = '#609FFF'
}

if (spoilers.length > 0) {
    for (let i = 0; i < spoilers.length; i++) {
        const spoiler = spoilers[i].childNodes;
        spoiler[1].addEventListener("click", function (e) {
            if (prevSpoiler !== undefined) {
                if (prevSpoiler === spoiler) {
                    closeSpoiler(prevSpoiler);
                    prevSpoiler = undefined;
                } else {
                    closeSpoiler(prevSpoiler);
                    prevSpoiler = spoiler;
                    openSpoiler(spoiler);
                }
            } else {
                prevSpoiler = spoiler;
                openSpoiler(spoiler);
            }
            e.preventDefault();
        });
    }
}