const chapters = document.querySelector('.info-chapters__chapters');
for (let i = 1; i < 1033; i++) {
	const anchor = document.createElement('a');
	anchor.href = '#';
	anchor.innerHTML = `Chapter ${i}`;
	chapters.append(anchor);
}
$(document).ready(() => {
	const createAddSign = () => {
		const addToListSignContainer = document.createElement('div');
		addToListSignContainer.classList.add('add-to-list-sign-container');
		const scoreValue = localStorage.getItem('score');
		const progressValue = localStorage.getItem('progress');
		addToListSignContainer.innerHTML = `<div class="add-to-list-sign">
            <div class="add-to-list-sign__header">
                <div class="img-div">
                    <img
                        src="https://s4.anilist.co/file/anilistcdn/media/manga/cover/large/bx30013-oT7YguhEK1TE.jpg"
                        alt="One Piece Poster"
                    />
                </div>
                <h3>One Piece</h3>
            </div>
            <form class="add-to-list-sign__inputs">
            <div>
            <label for='score'>Score</label>
                <input id='score' name='score' type="number" value='${
									scoreValue ? scoreValue : ''
								}' min='0' max='10' step='0.1'/>
                </div>
                <div>
            <label for='progress'>Progress</label>
            <input id='progress' name='progress' type="number" value='${
							progressValue ? progressValue : ''
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
			for (let i = 0; i < e.target.length - 1; i++) {
				if (e.target[i].value !== '') {
					localStorage.setItem(e.target[i].name, e.target[i].value);
				}
			}
			document.querySelector('.add-to-list-sign-container').remove();
			document.body.style.overflowY = 'scroll';
			e.preventDefault();
		};
		document
			.querySelector('.add-to-list-sign__inputs')
			.addEventListener('submit', onSubmit);
		const addToListSign = document.querySelector('.add-to-list-sign');
		addToListSign.addEventListener('click', (e) => e.stopPropagation());
	};
	document
		.querySelector('.add-to-list-btn')
		.addEventListener('click', openAddSign);
});
