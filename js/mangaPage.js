const chapters = document.querySelector('.info-chapters__chapters');
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);
// para que no se pueda scrollear en la pantalla de carga
document.body.style.overflow = 'hidden';

const id = urlParams.get('id');

if (!id) {
	window.location.replace('/pages/notFoundPage.html');
}

var manga = {};
/* Añade de la pagina HTML */
const addTitle = (manga) => {
	let title = '';
	/* Se define el titulo ya que puede venir en varios formatos, priorizando el titulo en ingles */
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
/* añade el poster del manga a la pagina */
const addPoster = (bannerImage) => {
	const poster = document.createElement('section');
	poster.classList.add('poster');
	poster.innerHTML = `<div class="img-div" style="background-image: url(${bannerImage})"></div>`;
	document.querySelector('main').append(poster);
};
/* añade la información del manga a la pagina */
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
	/* condicion para ver si se agrega un boton "read more" si el texto es mas grande que su contenedor */
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
/* crea y devuelve el boton para añadir un manga a la lista del usuario */
const createAddSign = () => {
	const addToListSignContainer = document.createElement('div');
	addToListSignContainer.classList.add('add-to-list-sign-container');
	const listStorage = JSON.parse(localStorage.getItem(id));

	let title = '';
	/* Se define el titulo ya que puede venir en varios formatos, priorizando el titulo en ingles */
	if (manga.title.english !== null) {
		title = manga.title.english;
	} else if (manga.title.romaji !== null) {
		title = manga.title.romaji;
	} else if (manga.title.native) {
		title = manga.title.native;
	}
	const poster = manga.coverImage.extraLarge;
	addToListSignContainer.innerHTML = `<div class="add-to-list-sign">
            <div class="add-to-list-sign__header">
                <div class="img-div">
                    <img
                        src="${poster}"
                        alt="One Piece Poster"
                    />
                </div>
                <h4>${title}</h4>
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
                <button type="submit" value="add">Add</button>
				${
					listStorage
						? `<button type="submit" id="remove" value="remove">Remove</button>`
						: ''
				}
            </form>
        </div>`;
	/* Elimina el boton para añadir a la lista del usuario */
	const removeAdd = () => {
		if (document.querySelector('.add-to-list-sign-container')) {
			document.querySelector('.add-to-list-sign-container').remove();
			document.body.style.overflowY = 'scroll';
		}
	};
	$('body').click(removeAdd);
	return addToListSignContainer;
};
/* añade el boton de añadir a la lista del usuario a la pagina */
const openAddSign = (e) => {
	/* si ya existe no lo crea */
	if (document.querySelector('.add-to-list-sign-container')) return;
	/* para evitar que el click en el body elimine el cartel */
	e.stopPropagation();
	/* para evitar que se scrollee mientras esta el cartel */
	document.querySelector('body').style.overflow = 'hidden';
	const addToListSignContainer = createAddSign();
	$('body').append(addToListSignContainer);
	/* añade los datos del cartel a la memoria */
	const addToLocalStorage = (e) => {
		const listStorage = {
			score: e.target[0].value,
			progress: e.target[1].value,
		};
		localStorage.setItem(id, JSON.stringify(listStorage));
		const addBtn = document.querySelector('.add-to-list-btn');
		document.querySelector('.add-to-list-sign-container').remove();
		document.body.style.overflowY = 'scroll';
		addBtn.innerHTML = 'On list';
	};
	/* elimina los datos de la lista del usuario de la memoria */
	const removeFromLocalStorage = (e) => {
		localStorage.removeItem(id);
		const addBtn = document.querySelector('.add-to-list-btn');
		document.querySelector('.add-to-list-sign-container').remove();
		document.body.style.overflowY = 'scroll';
		addBtn.innerHTML = 'Add to list';
	};

	const onSubmit = (e) => {
		if (e.submitter.value === 'add') {
			addToLocalStorage(e);
		}

		if (e.submitter.value === 'remove') {
			removeFromLocalStorage();
		}
		e.preventDefault();
	};
	document
		.querySelector('.add-to-list-sign__inputs')
		.addEventListener('submit', onSubmit);
	const addToListSign = document.querySelector('.add-to-list-sign');
	/* para evitar que el click en el body elimine el cartel */
	addToListSign.addEventListener('click', (e) => e.stopPropagation());
};
/* añade a la pagina la informacion extra y capitulos del manga */
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
	${
		manga.endDate.day
			? `
			<h5>End Date</h5>
			<p>${months[manga.endDate.month - 1]} ${manga.endDate.day}, ${
					manga.endDate.year
			  }</p>`
			: ''
	}
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
	/* crea y añade 100 capitulos */
	for (let i = 1; i < 101; i++) {
		const anchor = document.createElement('a');
		anchor.href = '#';
		anchor.innerHTML = `Chapter ${i}`;
		extraAndChapters.querySelector('.info-chapters__chapters').append(anchor);
	}

	document.querySelector('main').append(extraAndChapters);
	const chaptersContainer = document.querySelector('.info-chapters__chapters');
	const extraInfoContainer = document.querySelector(
		'.info-chapters__extra-info'
	);
	/* para que el contenedor de la informacion extra y capitulos tengan la misma altura */
	if (chaptersContainer && extraInfoContainer) {
		chaptersContainer.style.maxHeight = extraInfoContainer.clientHeight + 'px';
	}
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
			  endDate {
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
		manga = res.data.Media;

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
