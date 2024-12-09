const API_KEY = "AIzaSyBR8W9P_wv6BH4JGq6E1gauzVn2x_LF57A";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// gettting videos 

function getVideos (searchValue) {
    let url = `${BASE_URL}/search?key=${API_KEY}&q=${searchValue}&type=video&part=snippet&maxResults=10`;
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const videosContainer = document.querySelector("#videos-container");
        videosContainer.innerHTML = "";
        data.items.forEach((item) => {
            getChannelIcon(item);
        });
    });

}

// // getting channel Icon 

const getChannelIcon = (video) =>{
    fetch(
       `${BASE_URL}/channels?key=${API_KEY}&part=snippet&part=statistics&id=${video.snippet.channelId}`
    )
    .then((res) => res.json())
    .then((data) => {
        video.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        display(video);
    });
    
};




// // displaying videos 


function display(videos){
    const videosContainer = document.querySelector("#videos-container");
    videosContainer.innerHTML+=`
    <div class = "video" id = "videos-container">
    <a href="/video.html?videoId=${videos.id.videoId}">
    <img src = "${videos.snippet.thumbnails.high.url}" class = "thumbnail">
    <div class = "content">
    <img src = "${videos.channelThumbnail}" class = "channel-icon">
        <div class="info">
            <h4 class="title">${videos.snippet.title}</h4>
            <p class="channel-name">${videos.snippet.channelTitle}</p>
        </div>
    </div>
    </a>
    </div>

    `;
}


// // * -----------calling function nd searching---------------------------



setTimeout(() =>{
    getVideos("");
},700)

const videoContainer = document.querySelector("#videos-container");
document.getElementById("search-btn").addEventListener("click",() =>{
    const searchInputValue = document.getElementById("search-input").value;
    videoContainer.innerHTML = `<h1 class="loader" style=""></h1>`


    setTimeout(() =>{
        getVideos(searchInputValue);
    },300)
});

// const allElement = querySelectorAll("*");
// const darkbtn = querySelector("white-black-btn");
// let tog = true;
// darkbtn.addEventListener("click", DarkWhiteBtn);
// function DarkWhiteBtn(){
//     if (tog) {
//         allElement.forEach(function (element){
//             element.style.color="black";
//             element.style.backgroundColor="white";
//         });

//         document.querySelector(".tittle").style.color="black"
//         document.querySelector(".channel-name").style.color="black"
//         tog=false;
//     } else {
//         allElement.forEach(function (element){
//             element.style.color="black";
//             element.style.backgroundColor="black";
//         });

//         document.querySelector(".tittle").style.color="white";
//         document.querySelector("channel-name").style.color="white";
//         tog=true;
        
//     }
// }



const allElements = document.querySelectorAll("*");
const darkbtn = document.querySelector(".dark-white-btn");
let tog = true;
darkbtn.addEventListener("click", DarkWhiteBg);
function DarkWhiteBg() {
  if (tog) {
    allElements.forEach(function (element) {
      // Change color and background color
      element.style.color = "black";
      element.style.backgroundColor = "white";
    });

    // document.querySelector("body").style.background = "white";
    document.querySelector(".title").style.color = "black";
    document.querySelector(".channel-name").style.color = "black";
    tog = false;
  } else {
    allElements.forEach(function (element) {
      // Change color and background color
      element.style.color = "white";
      element.style.backgroundColor = "black";
    });

    // document.querySelector("body").style.background = "black";
    document.querySelector(".title").style.color = "white";
    document.querySelector(".channel-name").style.color = "white";
    tog = true;
  }
}