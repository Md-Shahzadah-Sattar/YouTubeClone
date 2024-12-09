const API_KEY = "AIzaSyBR8W9P_wv6BH4JGq6E1gauzVn2x_LF57A";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// todo------------------------- Loading content --------------------------------------


window.addEventListener("load", () => {
  // it gives us '?videoId=videoid' like this
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const videoId = params.get("videoId");
  //      or we can get the videoid using localStorage.getItem

  if (YT) {
    new YT.Player("video-container", {
      height: "420",
      width: "770",
      videoId: videoId,
    });
  }

  function getRelatedContent(channelTitle) {
    let url;
    url = `${BASE_URL}/search?key=${API_KEY}&q=${channelTitle}&type=video&part=snippet&maxResults=1`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        display(data.items);
      });
  }

  function getVideosDetails() {
    let url;
    url = `${BASE_URL}/videos?key=${API_KEY}&part=snippet&id=${videoId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.getElementById("video_title").innerHTML = `
        ${data.items[0].snippet.title}
        `;
        console.log(data.items[0].snippet.channelId);
        // *
        getChannelDetails(data.items[0].snippet.channelId);
        getRelatedContent(data.items[0].snippet.channelTitle);
      });
  }

  function getChannelDetails(channel) {
    let url;
    url = `${BASE_URL}/channels?key=${API_KEY}&part=snippet&part=statistics&id=${channel}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        document.getElementById("channelInfo").innerHTML = `
              <img src="${data.items[0].snippet.thumbnails.high.url}" class="channel-icon" alt="">
              <h5 class="channelName">${data.items[0].snippet.title}</h5>
              <p style="color:grey">${data.items[0].statistics.subscriberCount} Subscribers</p>
        `;
        document.getElementById("description").innerHTML = `
          <p>${data.items[0].snippet.localized.description} </p>
          `;
      });
  }

  function getComments() {
    let url;
    url = `${BASE_URL}/commentThreads?key=${API_KEY}&part=snippet&videoId=${videoId}&maxResults=10`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        var cmnt="";
        data.items
        .map((comment) => {
            // console.log(comment);
            cmnt += `<img src="${comment.snippet.topLevelComment.snippet.authorProfileImageUrl}" class="profile-img">
          <span>${comment.snippet.topLevelComment.snippet.authorDisplayName}</span>
        
          <p>${comment.snippet.topLevelComment.snippet.textOriginal}</p>
          `;
          })
          .join("");

        document.getElementById("other_comments").innerHTML = cmnt;
      });
  }

  function display(videos) {
    var myDiv = document.querySelector(".myDiv");
    var content = myDiv.innerHTML; // This will give you the HTML content inside the <div>

    const htmlContent = videos
      .map(
        (video) =>
          `
        <a href="/video.html?videoId=${video.id.videoId}">
          <li>
            <img src="${video.snippet.thumbnails.high.url}">
            <p>${video.snippet.description}</p>
          </li>
        </a>
        `
      )
      .join("");

    myDiv.innerHTML += htmlContent;
  }

  getVideosDetails(); // ! main callling
  getComments();
});