
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

    video_mode = 'data_compress_5';
    current_data_idx = 0;

    rec_video = document.getElementById('rec-video');


    method_selector = document.getElementById('method_selector');

    demo_video = document.getElementById('main-video');


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



    // LLFF video
    current_sr_llff_idx = 0;
    sr_video_llff = document.getElementById('sr-video_llff');
    curernt_sr_method_llff = "trinerflet";
    method_selector_sr_llff = document.getElementById('method_selector_llff2');

    llffThumbnailsVid = [
        document.getElementById('flower_llff2'),
        document.getElementById('fern_llff2'),
        document.getElementById('fortress_llff2'),
        document.getElementById('horns_llff2'),
        document.getElementById('leaves_llff2'),
        document.getElementById('orchids_llff2'),
        document.getElementById('room_llff2'),
        document.getElementById('trex_llff2'),
    ];
    for (var i = 0; i < llffThumbnailsVid.length; i++) {
        llffThumbnailsVid[i].addEventListener('click', change_sr_scene_index_llff.bind(this, i));
    }
    change_sr_scene_index_llff(current_sr_llff_idx);

    method_selector_sr_llff.addEventListener('change',change_method_sr_llff.bind(this))
    // console.log("Hello world!");

    qualityThumbnails = [
        document.getElementById('compressed_button'),
        document.getElementById('original_button'),
    ];
    for (var i = 0; i < qualityThumbnails.length; i++) {
        qualityThumbnails[i].addEventListener('click', reload_all_vids.bind(this, i));
    }
    reload_all_vids(0);







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
    rec_video.src = video_mode + "/videos/3d_rec/"+curernt_rec_method+"/" + recThumbnails[current_rec_idx].id + ".mp4";
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
    sr_video.src = video_mode + "/videos/sr/" + srThumbnails[current_sr_idx].id + "/" +curernt_sr_method +  ".mp4";
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
    llff_img.src = video_mode + "/images/llff/" + llffThumbnails[idx].value + "/" + current_llff_method + "_" + llff_img_idx + ".png";
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





function change_sr_scene_index_llff(idx) {
    change_sr_scene_index_aux_llff(idx);
    sr_video_llff.currentTime = 0
}
function change_sr_scene_index_aux_llff(idx) {
    llffThumbnailsVid[idx].classList.add("active-btn");
    if (current_sr_llff_idx != idx) {
        llffThumbnailsVid[current_sr_llff_idx].classList.remove("active-btn");
    }
    current_sr_llff_idx = idx;
    sr_video_llff.src = video_mode+ "/videos/llff/" + llffThumbnailsVid[current_sr_llff_idx].value + "/" +curernt_sr_method_llff +  ".mp4";
    sr_video_llff.load();
}

function change_method_sr_llff (event) {
    curernt_sr_method_llff = event.target.value
    tt = sr_video_llff.currentTime;
    is_paused = sr_video_llff.paused;
    change_sr_scene_index_aux_llff(current_sr_llff_idx);
    sr_video_llff.currentTime = tt;
    if (is_paused) {
        sr_video_llff.pause();
    }
}


function reload_all_vids(data_idx){
    qualityThumbnails[data_idx].classList.add("active-btn");
    if (data_idx == 0){
        tmp_video_mode = 'data_compress_5';
    }
    if (data_idx == 1){
        tmp_video_mode = 'data';
    }

    if (tmp_video_mode != video_mode){
        qualityThumbnails[current_data_idx].classList.remove("active-btn");
        video_mode = tmp_video_mode;
        current_data_idx = data_idx;

        rec_video.src = video_mode + "/videos/3d_rec/"+curernt_rec_method+"/" + recThumbnails[current_rec_idx].id + ".mp4";
        rec_video.load();

        sr_video.src = video_mode + "/videos/sr/" + srThumbnails[current_sr_idx].id + "/" +curernt_sr_method +  ".mp4";
        sr_video.load();

        sr_video_llff.src = video_mode+ "/videos/llff/" + llffThumbnailsVid[current_sr_llff_idx].value + "/" +curernt_sr_method_llff +  ".mp4";
        sr_video_llff.load();

        demo_video.src = video_mode+ "/videos/demo.mp4";
        demo_video.load();


    }


}

