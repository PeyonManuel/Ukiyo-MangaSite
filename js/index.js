import { carouselMangas, topRatedMangas, forums } from './data.js';
const carousel = document.querySelector('.pop-week');
carouselMangas.forEach((manga, i) => {
	const mangaAnchor = document.createElement('a');
	mangaAnchor.href = '#';
	if (manga.name === 'One Piece') mangaAnchor.href = './pages/mangaPage.html';
	mangaAnchor.classList.add('item');
	if (i === 0) mangaAnchor.classList.add('active');
	mangaAnchor.innerHTML = `<div class="img-div">
    <img
        src="${manga.image}"
        alt="${manga.name} poster"
    />
</div>
<div class="carousel-caption">
    <h3>${manga.name}</h3>
</div>`;
	carousel.append(mangaAnchor);
});
const topRatedDiv = document.querySelector('.top-rated-div');
topRatedMangas.forEach((manga) => {
	const mangaAnchor = document.createElement('a');
	mangaAnchor.href = '#';
	if (manga.name === 'One Piece') mangaAnchor.href = './pages/mangaPage.html';
	mangaAnchor.classList.add('manga-card');
	mangaAnchor.innerHTML = `<div class="img-div">
    <img
        src="${manga.image}"
        alt="${manga.name} poster"
    />
</div>
<div class="manga-info">
    <span>${manga.name}</span>
    <span>${manga.rating}</span>
</div>`;
	topRatedDiv.append(mangaAnchor);
});
const forumsDiv = document.querySelector('.forums-div');
forums.forEach((forum, i) => {
	const forumAnchor = document.createElement('a');
	forumAnchor.href = '#';
	if (forum.title === 'Tokyo Revengers 218 discusion')
		forumAnchor.href = './pages/forum.html';
	forumAnchor.classList.add('forum-thread');
	console.log(forum.categories);
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
