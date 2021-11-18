const chapters = document.querySelector('.info-chapters__chapters');
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

document.body.style.overflow = 'hidden';

const id = urlParams.get('id');

if (!id) {
	window.location.replace('/pages/notFoundPage.html');
}

const addTitle = (manga) => {
	let title = '';

	if (manga.title.english !== null) {
		title = manga.title.english;
	} else if (manga.title.romaji !== null) {
		title = manga.title.romaji;
	} else if (manga.title.native) {
		title = manga.title.native;
	}

	const HTMLtitle = document.querySelector('title');
	HTMLtitle.innerHTML = `Ukiyo - ${title}`;
	document.head.append(HTMLtitle);
	return title;
};

const addPoster = (bannerImage) => {
	const poster = document.createElement('section');
	poster.classList.add('poster');
	poster.innerHTML = `<div class="img-div" style="background-image: url(${bannerImage})"></div>`;
	document.querySelector('main').append(poster);
};

const addMangaInfo = (manga, title) => {
	const listStorage = JSON.parse(localStorage.getItem(id));
	const mangaInfo = document.createElement('section');
	mangaInfo.innerHTML = `<div class="manga-page-info">
		<div>
			<div class="manga-page-info__img img-div" ${
				!manga.bannerImage &&
				`style="margin-top: 2rem; animation: imgStartReverse 0.3s;"`
			}>
				<img
					src="${manga.coverImage.extraLarge}"
					alt="Poster"
				/>
			</div>
			<button class="add-to-list-btn">${
				listStorage ? 'On list' : 'Add to list'
			}</button>
		</div>
		<div class="manga-page-info__text" ${
			!manga.bannerImage && `style="align-self: flex-end; max-height: 40rem"`
		}>
			<h1>${title}</h1>
			<p>
				${manga.description}
			</p>
		</div>
	</div>`;

	document.querySelector('main').append(mangaInfo);
	const description = mangaInfo
		.querySelector('.manga-page-info__text')
		.querySelector('p');

	if (
		description.offsetHeight * window.devicePixelRatio > 160 &&
		manga.bannerImage
	) {
		const infoText = document.querySelector('.manga-page-info__text');
		const readMoreBtn = document.createElement('button');
		readMoreBtn.classList.add('description-read-more-btn');
		readMoreBtn.innerHTML = 'Read more';
		readMoreBtn.onclick = () => {
			infoText.style.maxHeight = '100rem';
			readMoreBtn.remove();
		};
		infoText.append(readMoreBtn);
	}
};

const createAddSign = () => {
	const addToListSignContainer = document.createElement('div');
	addToListSignContainer.classList.add('add-to-list-sign-container');
	const listStorage = JSON.parse(localStorage.getItem(id));
	console.log(listStorage);
	const title = document
		.querySelector('.manga-page-info__text')
		.querySelector('h1').innerHTML;
	const poster = document
		.querySelector('.manga-page-info__img')
		.querySelector('img').src;
	addToListSignContainer.innerHTML = `<div class="add-to-list-sign">
            <div class="add-to-list-sign__header">
                <div class="img-div">
                    <img
                        src="${poster}"
                        alt="One Piece Poster"
                    />
                </div>
                <h3>${title}</h3>
            </div>
            <form class="add-to-list-sign__inputs">
            <div>
            <label for='score'>Score</label>
                <input id='score' name='score' type="number" value='${
									listStorage ? listStorage.score : ''
								}' min='0' max='10' step='0.1'/>
                </div>
                <div>
            <label for='progress'>Progress</label>
            <input id='progress' name='progress' type="number" value='${
							listStorage ? listStorage.progress : ''
						}' min='0'/>
            </div>
                <button type="submit">Add</button>
            </form>
        </div>`;
	const removeAdd = () => {
		if (document.querySelector('.add-to-list-sign-container')) {
			document.querySelector('.add-to-list-sign-container').remove();
			document.body.style.overflowY = 'scroll';
		}
	};
	$('body').click(removeAdd);
	return addToListSignContainer;
};
const openAddSign = (e) => {
	e.stopPropagation();
	document.querySelector('body').style.overflow = 'hidden';
	const addToListSignContainer = createAddSign();
	$('body').append(addToListSignContainer);
	const onSubmit = (e) => {
		const listStorage = {
			score: e.target[0].value,
			progress: e.target[1].value,
		};
		const addBtn = document.querySelector('.add-to-list-btn');
		localStorage.setItem(id, JSON.stringify(listStorage));
		document.querySelector('.add-to-list-sign-container').remove();
		document.body.style.overflowY = 'scroll';
		addBtn.innerHTML = 'On list';
		e.preventDefault();
	};
	document
		.querySelector('.add-to-list-sign__inputs')
		.addEventListener('submit', onSubmit);
	const addToListSign = document.querySelector('.add-to-list-sign');
	addToListSign.addEventListener('click', (e) => e.stopPropagation());
};

const addExtraAndChapters = (manga) => {
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'June',
		'July',
		'Aug',
		'Sept',
		'Oct',
		'Nov',
		'Dec',
	];
	const extraAndChapters = document.createElement('section');
	extraAndChapters.classList.add('info-chapters');
	extraAndChapters.innerHTML = `<div class="info-chapters__extra-info">
	<div class="info-chapters__extra-info__item">
		<h5>Status</h5>
		<p>${manga.status}</p>
	</div>
	<div class="info-chapters__extra-info__item">
		<h5>Start Date</h5>
		<p>${months[manga.startDate.month - 1]} ${manga.startDate.day}, ${
		manga.startDate.year
	}</p>
	</div>
	<div class="info-chapters__extra-info__item">
		${
			manga.averageScore
				? `<h5>Average Score</h5>
		<p>${manga.averageScore}%</p>`
				: ''
		}
	</div>
	<div class="info-chapters__extra-info__item">
		<h5>Genres</h5>
		<p>${manga.genres.map((genre) => genre).join(', ')}</p>
	</div>
</div>
<div class="info-chapters__chapters"></div>`;

	for (let i = 1; i < 101; i++) {
		const anchor = document.createElement('a');
		anchor.href = '#';
		anchor.innerHTML = `Chapter ${i}`;
		extraAndChapters.querySelector('.info-chapters__chapters').append(anchor);
	}

	document.querySelector('main').append(extraAndChapters);
};

fetch('https://graphql.anilist.co/', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		query: `{
			Media (id: ${id},type: MANGA, format: MANGA) {
				id
			  title {
				english
				romaji
				native
			  }
			  startDate {
				year
				month
				day
			  }
			  description
			  genres
			  status
			  chapters
			  averageScore
			  bannerImage
			  coverImage {
				  extraLarge
			  }
			}
		  }`,
	}),
})
	.then((res) => res.json())
	.then((res) => {
		const manga = res.data.Media;

		const title = addTitle(manga);

		if (manga.bannerImage) {
			addPoster(manga.bannerImage);
		}

		if (!manga.bannerImage) {
			const header = document.querySelector('header');
			header.classList.remove('manga-page');
			const navbar = document.querySelector('.navbar');
			navbar.classList.remove('manga-page');
		}

		addMangaInfo(manga, title);

		addExtraAndChapters(manga);

		document
			.querySelector('.add-to-list-btn')
			.addEventListener('click', openAddSign);

		document.body.style.overflowY = 'scroll';
		document.querySelector('.loading-screen').remove();
	})
	.catch((error) => {
		window.location.replace('/pages/notFoundPage.html');
	});
