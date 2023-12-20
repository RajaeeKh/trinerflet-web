
var VIDEO_ASPECT_RATIO = 16.0 / 9.0;



$("#rec-video").on('loadedmetadata', function() {
    this.width = this.videoWidth;
    this.height = this.videoHeight;
    console.log(this.width, this.height);
});

$(function() {
    current_rec_idx = 0;
    current_sr_idx = 0;

    curernt_rec_method = "trinerflet";

    rec_video = document.getElementById('rec-video');


    method_selector = document.getElementById('method_selector');


    // farmText = document.getElementById('farm-text');
    // bearText = document.getElementById('bear-text');

    recThumbnails = [
        document.getElementById('ship_rec'),
        document.getElementById('lego_rec'),
        document.getElementById('chair_rec'),
        document.getElementById('mic_rec'),
        document.getElementById('materials_rec'),
        document.getElementById('hotdog_rec'),
        document.getElementById('ficus_rec'),
        document.getElementById('drums_rec'),
    ];
    for (var i = 0; i < recThumbnails.length; i++) {
        recThumbnails[i].addEventListener('click', change_rec_scene_index.bind(this, i));
    }
    change_rec_scene_index(current_rec_idx);

    method_selector.addEventListener('change',change_method.bind(this))



    sr_video = document.getElementById('sr-video');
    curernt_sr_method = "sr";
    method_selector_sr = document.getElementById('method_selector_sr');


    srThumbnails = [
        document.getElementById('ship_sr'),
        document.getElementById('lego_sr'),
        document.getElementById('chair_sr'),
        document.getElementById('mic_sr'),
        document.getElementById('materials_sr'),
        document.getElementById('hotdog_sr'),
        document.getElementById('ficus_sr'),
        document.getElementById('drums_sr'),
    ];
    for (var i = 0; i < srThumbnails.length; i++) {
        srThumbnails[i].addEventListener('click', change_sr_scene_index.bind(this, i));
    }
    change_sr_scene_index(current_sr_idx);

    method_selector_sr.addEventListener('change',change_method_sr.bind(this))


    llff_img = document.getElementById('llff_img');
    current_llff_method = "trinerflet";
    method_selector_llff = document.getElementById('method_selector_llff');
    llff_img_idx = 0;
    current_llff_idx = 0;

    llff_imgs_num = {};
    llff_imgs_num['fern'] = 3;
    llff_imgs_num['flower'] = 5;
    llff_imgs_num['fortress'] = 6;
    llff_imgs_num['horns'] = 8;

    llff_imgs_num['leaves'] = 4;
    llff_imgs_num['orchids'] = 4;
    llff_imgs_num['room'] = 6;
    llff_imgs_num['trex'] = 7;


    llffThumbnails = [
        document.getElementById('flower_llff'),
        document.getElementById('fern_llff'),
        document.getElementById('fortress_llff'),
        document.getElementById('horns_llff'),
        document.getElementById('leaves_llff'),
        document.getElementById('orchids_llff'),
        document.getElementById('room_llff'),
        document.getElementById('trex_llff'),
    ];
    for (var i = 0; i < llffThumbnails.length; i++) {
        llffThumbnails[i].addEventListener('click', change_llff_scene_index.bind(this, i));
    }
    change_llff_scene_index(current_llff_idx);
    method_selector_llff.addEventListener('change',change_method_llff.bind(this))

    llff_prev_button = document.getElementById('llff_prev');
    llff_next_button = document.getElementById('llff_next');

    llff_prev_button.addEventListener('click', prev_llff.bind(this));
    llff_next_button.addEventListener('click', next_llff.bind(this));

    // console.log("Hello world!");







});

function change_rec_scene_index(idx) {
    change_rec_scene_index_aux(idx);
    rec_video.currentTime = 0
}
function change_rec_scene_index_aux (idx) {
    recThumbnails[idx].classList.add("active-btn");
    if (current_rec_idx != idx) {
        recThumbnails[current_rec_idx].classList.remove("active-btn");
    }
    current_rec_idx = idx;
    rec_video.src = "data/videos/3d_rec/"+curernt_rec_method+"/" + recThumbnails[idx].id + ".mp4";
    rec_video.load();
}

function change_method (event) {
    curernt_rec_method = event.target.value
    tt = rec_video.currentTime;
    is_paused = rec_video.paused;
    change_rec_scene_index_aux(current_rec_idx);
    rec_video.currentTime = tt;
    if (is_paused) {
        rec_video.pause();
    }
}


function change_sr_scene_index(idx) {
    change_sr_scene_index_aux(idx);
    sr_video.currentTime = 0
}
function change_sr_scene_index_aux (idx) {
    srThumbnails[idx].classList.add("active-btn");
    if (current_sr_idx != idx) {
        srThumbnails[current_sr_idx].classList.remove("active-btn");
    }
    current_sr_idx = idx;
    sr_video.src = "data/videos/sr/" + srThumbnails[idx].id + "/" +curernt_sr_method +  ".mp4";
    sr_video.load();
}

function change_method_sr (event) {
    curernt_sr_method = event.target.value
    tt = sr_video.currentTime;
    is_paused = sr_video.paused;
    change_sr_scene_index_aux(current_sr_idx);
    sr_video.currentTime = tt;
    if (is_paused) {
        sr_video.pause();
    }
}


function change_llff_scene_index(idx){
    llff_img_idx = 0;
    change_llff_scene_index_aux(idx);
}

function change_llff_scene_index_aux(idx) {
    // llffThumbnails[idx].classList.add("active-btn");
    // if (current_llff_idx != idx) {
    //     llffThumbnails[current_llff_idx].classList.remove("active-btn");
    // }
    current_llff_idx = idx;
    llff_img.src = "data/images/llff/" + llffThumbnails[idx].value + "/" + current_llff_method + "_" + llff_img_idx + ".png";
    // llff_img.load();
}

function change_method_llff (event) {
    current_llff_method = event.target.value
    change_llff_scene_index_aux(current_llff_idx);
}

function prev_llff (event){
    llff_img_idx = llff_img_idx - 1 + llff_imgs_num[llffThumbnails[current_llff_idx].value]
    llff_img_idx = llff_img_idx % llff_imgs_num[llffThumbnails[current_llff_idx].value]
    change_llff_scene_index_aux(current_llff_idx);
}

function next_llff (event){
    llff_img_idx = llff_img_idx + 1
    llff_img_idx = llff_img_idx % llff_imgs_num[llffThumbnails[current_llff_idx].value]
    change_llff_scene_index_aux(current_llff_idx);
}


