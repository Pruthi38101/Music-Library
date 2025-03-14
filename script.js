let data = [];
let currentindex = 0;
let audioplayer = document.querySelector(".audio");
let rightshift = document.getElementById("rightbutton");
let leftshift = document.getElementById("leftbutton"); // If you have a left button
let footer = document.querySelector(".footer");

fetch("songs.json")
    .then(response => response.json())
    .then(songs => {
        console.log(songs);
        const songboxes = document.querySelector(".songboxes");
        const playlist = document.querySelector(".playlist");
        let count =0;

        songs.forEach(songe => {
            const box = document.createElement("div");
            const song = document.createElement("div");
            song.classList.add("song");
            box.classList.add("box");

            box.innerHTML = `
                <div class="imagebox relative">
                    <img src="${songe.image}" alt="song image">
                </div>
                <div class="stickyplaybutton absolute" data-index="${count}">
                    <img src="all icons/playbutton.svg" width="30px" height="30px" alt="playbutton">
                </div>
                <div class="textdiv">
                    <p id="exception1">Song: ${songe.songname}</p>
                    <p id="exception2">Artist: ${songe.artist}</p>
                </div>`;

            song.innerHTML = `
                <img src="${songe.image}" id="im" alt="pruthi">
                <div class="textdiv2">
                    <p style="font-size: 25px;">${count} : ${songe.songname}</p><br>
                    <p class="textsize">Artist: ${songe.artist}</p>
                </div>
                <div class="stickyplaybutton" data-index="${count}">
                    <img src="all icons/playbutton.svg" width="30px" height="30px" alt="playbutton">
                </div>`;

            count++;
            songboxes.prepend(box);
            playlist.prepend(song);
        });

        data = songs;
        checkindex(currentindex);

        // ✅ Attach event listeners after elements are created
        document.querySelectorAll(".stickyplaybutton").forEach(button => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index")); // Convert to number
                currentindex = index;
                checkindex(currentindex);
            });
        });
    });

// ✅ Function to update audio player
function checkindex(currentindex) {
    if (data.length === 0) return; // Prevent error if data is empty
    let song = data[currentindex];

    audioplayer.src = song.songurl;
    audioplayer.play();

    let songname = song.songname;
    let songartist = song.artist;
    let songimage = song.image;

    let display = document.querySelector(".div1");
    display.innerHTML = `
        <div class="footersong">
            <img src="${songimage}" alt="pruthi">
            <div class="footertextdiv">
                <p style="font-size:30px;">${songname}</p>
                <p style="font-size:20px;">Artist: ${songartist}</p>
            </div>
        </div>`;

    // ✅ Show footer when playing
    footer.style.maxHeight = "300px";
}
 //creating a new division for toggle playbuttoj image
//  let parentdiv=document.querySelector(".play")
//  let old=document.querySelector(".toggle")
//  let newdiv=document.createElement("img")
//  newdiv=` <img src="all icons/leftplay.svg" class="toggle" height="33px" width="33px" alt="rightbutton">`
// ✅ Toggle Play/Pause
var toggle=document.querySelector(".toggle")
toggle.addEventListener("click",function() {
    if (audioplayer.paused) {
        // parentdiv.replaceChild(old,newdiv)
        audioplayer.play();

    } else {
        // parentdiv.replaceChild(newdiv,old)
        audioplayer.pause();
    }
})

// ✅ Next song (right button)
rightshift.addEventListener("click", () => {
    if (currentindex < data.length - 1) {
        currentindex++;
        checkindex(currentindex);
    }
});

// ✅ Previous song (left button)
leftshift.addEventListener("click", () => {
    if (currentindex > 0) {
        currentindex--;
        checkindex(currentindex);
    }
});
//new song after ending
audioplayer.addEventListener("ended", () => {
    currentindex = (currentindex + 1) % data.length; // Move to next song, loop to first after last
    audioplayer.src = data[currentindex].songurl;
    audioplayer.play();
});

const parentBox = document.querySelector('.box');
const playButton = document.querySelector('.stickyplaybutton');

parentBox.addEventListener('mouseenter', function() {
    playButton.style.display = 'block';
});

parentBox.addEventListener('mouseleave', function() {
    playButton.style.display = 'none';
});
