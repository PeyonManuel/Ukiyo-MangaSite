import { forums } from './data.js';
const carousel = document.querySelector('.pop-week');

document.body.style.overflow = 'hidden';

let loadedApis = 0;
const numberOfCalls = 2;

fetch('https://graphql.anilist.co/', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		query: `{
			Page (page: 1, perPage: 15) {
			media (sort: TRENDING_DESC, type: MANGA, format: MANGA) {
				id
			  title {
				english
				romaji
				native
			  }
			  bannerImage
			}
		}
		  }`,
	}),
})
	.then((res) => res.json())
	.then((res) => {
		res.data.Page.media.forEach((manga, i) => {
			if (manga.bannerImage) {
				const mangaAnchor = document.createElement('a');
				mangaAnchor.href = `./pages/mangaPage.html?id=${manga.id}`;
				let title = '';

				if (manga.title.english !== null) {
					title = manga.title.english;
				} else if (manga.title.romaji !== null) {
					title = manga.title.romaji;
				} else if (manga.title.native) {
					title = manga.title.native;
				}

				mangaAnchor.classList.add('item');

				if (i === 0) {
					mangaAnchor.classList.add('active');
				}

				mangaAnchor.innerHTML = `<div class="img-div">
			<img
				src="${manga.bannerImage}"
				alt="${title} poster"
			/>
		</div>
		<div class="carousel-caption">
			<h3>${title}</h3>
		</div>`;

				carousel.append(mangaAnchor);
			}
		});
		loadedApis++;

		if (loadedApis === numberOfCalls) {
			document.body.style.overflowY = 'scroll';
			document.querySelector('.loading-screen').remove();
		}
	})
	.catch((error) => {
		console.log(error);
		loadedApis++;

		if (loadedApis === numberOfCalls) {
			document.body.style.overflowY = 'scroll';
			document.querySelector('.loading-screen').remove();
		}
	});

const topRatedDiv = document.querySelector('.top-rated-div');

fetch('https://graphql.anilist.co/', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		query: `{
			Page (page: 1, perPage: 10) {
			media (averageScore_greater: 86, type: MANGA, format: MANGA, sort: SCORE_DESC) {
				id
			  title {
				english
				romaji
				native
			  }
			  averageScore
			  coverImage {
				  extraLarge
			  }
			}
		}
		  }`,
	}),
})
	.then((res) => res.json())
	.then((res) => {
		res.data.Page.media.forEach((manga) => {
			const mangaAnchor = document.createElement('a');
			mangaAnchor.href = `./pages/mangaPage.html?id=${manga.id}`;

			let title = '';

			if (manga.title.english !== null) {
				title = manga.title.english;
			} else if (manga.title.romaji !== null) {
				title = manga.title.romaji;
			} else if (manga.title.native) {
				title = manga.title.native;
			}

			mangaAnchor.classList.add('manga-card');
			mangaAnchor.innerHTML = `<div class="img-div">
			<img
				src="${manga.coverImage.extraLarge}"
				alt="${manga.title.english} poster"
			/>
		</div>
		<div class="manga-info">
			<span>${title}</span>
			<span>${manga.averageScore}%</span>
		</div>`;
			topRatedDiv.append(mangaAnchor);
		});
		loadedApis++;

		if (loadedApis === numberOfCalls) {
			document.body.style.overflowY = 'scroll';
			document.querySelector('.loading-screen').remove();
		}
	})
	.catch((error) => {
		console.log(error);
		loadedApis++;

		if (loadedApis === numberOfCalls) {
			document.body.style.overflowY = 'scroll';
			document.querySelector('.loading-screen').remove();
		}
	});

const forumsDiv = document.querySelector('.forums-div');

forums.forEach((forum, i) => {
	const forumAnchor = document.createElement('a');
	forumAnchor.href = '#';

	if (forum.title === 'Tokyo Revengers 218 discusion') {
		forumAnchor.href = './pages/forum.html';
	}

	forumAnchor.classList.add('forum-thread');
	forumAnchor.innerHTML = `<h3>${forum.title}</h3>
    <p>${forum.description}</p>
    <div class="flex">
        <span><img src="./images/view.png" alt="Visitas" />${forum.views}</span
        ><span
            ><img
                src="./images/oval-black-speech-bubble.png"
                alt="Comentarios"
            />${forum.comments}</span
        >
    </div>
    <div class="flex">
        ${forum.categories
					.map(
						(category) =>
							`<span class="forum-category ${category.colorClass}">${category.name}</span>`
					)
					.join('')}
    </div>`;

	forumsDiv.append(forumAnchor);
});
