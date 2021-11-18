import { premiumPlans } from './data.js';
const buyBtns = document.querySelectorAll('.buy-btn');
const createPlans = () => {
	const plans = document.createElement('div');
	plans.classList.add('plans');
	plans.innerHTML = `<div class="plans__plans-div">
	${premiumPlans
		.map((plan) => {
			return `<div class='plans__plans-div__plan'>
			<img src="${plan.image}" alt="${plan.name}" />
		<h3>${plan.name}</h3>
		<h4>${plan.price}/month</h4>
		<ul>
			${plan.checks
				.map((check) => {
					return `<li>
				<img src="../images/check.png" alt="Check" />
				<p>${check}</p>
							</li>`;
				})
				.join('')}

				${plan.crosses
					.map((cross) => {
						return `<li>
					<img src="../images/cancel.png" alt="Cross" />
					<p>${cross}</p>
								</li>`;
					})
					.join('')}
		</ul>
		<button>Buy now</button>
			</div>`;
		})
		.join('')}
	
</div>`;
	const removePlans = () => {
		if (document.querySelector('.plans')) {
			document.querySelector('.plans').remove();
			document.body.style.overflowY = 'scroll';
		}
	};
	document.body.addEventListener('click', removePlans);
	return plans;
};
const openPlans = (e) => {
	e.stopPropagation();
	//para safari
	document.body.scrollTop = 0;
	//para otros
	document.documentElement.scrollTop = 0;
	const plans = createPlans();
	document.body.style.overflow = 'hidden';
	document.body.append(plans);
	const plansInnerDiv = document.querySelector('.plans__plans-div');
	plansInnerDiv.addEventListener('click', (e) => e.stopPropagation());
};
buyBtns.forEach((buyBtn) => buyBtn.addEventListener('click', openPlans));
