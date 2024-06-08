const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";

async function searchSongs(term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  showData(data);
}

function showData(data) {
  result.innerHTML = `
	<ul class="songs"> 
		${data.data
      .map(
        (song) => `
			<li>
				<span><strong>${song.artist.name} </strong> - ${song.title} </span><button class="btn"  data-artist="${song.artist.name}" data-songTitle="${song.title}">Get Lyrics</button>
			 </li>`
      )
      .join("")}

	</ul>
	`;

  if (data.prev || data.next) {
    more.innerHTML = `
			${
        data.prev
          ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev </button>`
          : ""
      }
			${
        data.next
          ? `<button class="btn" onclick="getMoreSongs('${data.next}')">  Next </button>`
          : ""
      }
		`;
  } else {
    more.innerHTML = "";
  }
}

async function getMoreSongs(url) {
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  showData(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("lyricsDiv").innerHTML = "";
  const searchTerm = search.value.trim();
  if (!searchTerm) {
    alert("Please type artist or song name");
  } else {
    searchSongs(searchTerm);
  }
});

async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, " <br> ");
  let lyricsDiv = document.getElementById("lyricsDiv");
  lyricsDiv.innerHTML = `<h2> <strong>${artist}</strong> - ${songTitle}</h2>
		<span> ${lyrics}</span>`;
}

result.addEventListener("click", (e) => {
  const clickedElm = e.target;
  if (clickedElm.tagName === "BUTTON") {
    const artist = clickedElm.getAttribute("data-artist");
    const songTitle = clickedElm.getAttribute("data-songTitle");
    getLyrics(artist, songTitle);
  }
});
