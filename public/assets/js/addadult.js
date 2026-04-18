(function ($) {
	"use strict";

	(function () {
		// Cache elements
		const guestBtn = document.querySelector("#guests-input-btn"),
			guestOptions = document.querySelector("#guests-input-options"),
			adultsSubsBtn = document.querySelector("#adults-subs-btn"),
			adultsAddBtn = document.querySelector("#adults-add-btn"),
			childrenSubsBtn = document.querySelector("#children-subs-btn"),
			childrenAddBtn = document.querySelector("#children-add-btn"),
			adultsCountEl = document.querySelector("#guests-count-adults"),
			childrenCountEl = document.querySelector("#guests-count-children");

		// Ensure all required elements exist
		if (!guestBtn || !guestOptions || !adultsSubsBtn || !adultsAddBtn || !childrenSubsBtn || !childrenAddBtn || !adultsCountEl || !childrenCountEl) {
			console.warn("Guest selector elements missing.");
			return;
		}

		let maxNumGuests = 15,
			isGuestInputOpen = false,
			adultsCount = 1,
			childrenCount = 0;

		updateValues();

		guestBtn.addEventListener('click', function (e) {
			e.preventDefault();
			guestBtn.classList.toggle("open");
			guestOptions.classList.toggle("open");
			isGuestInputOpen = !isGuestInputOpen;
		});

		adultsAddBtn.addEventListener('click', function () {
			adultsCount = addValues(adultsCount);
			updateValues();
		});

		adultsSubsBtn.addEventListener('click', function () {
			adultsCount = substractValues(adultsCount, 1);
			updateValues();
		});

		childrenAddBtn.addEventListener('click', function () {
			childrenCount = addValues(childrenCount);
			updateValues();
		});

		childrenSubsBtn.addEventListener('click', function () {
			childrenCount = substractValues(childrenCount, 0);
			updateValues();
		});

		function calcTotalGuests() {
			return adultsCount + childrenCount;
		}

		function addValues(count) {
			return (calcTotalGuests() < maxNumGuests) ? count + 1 : count;
		}

		function substractValues(count, min) {
			return (count > min) ? count - 1 : count;
		}

		function updateValues() {
			let btnText = `${adultsCount} Guests`;
			btnText += (childrenCount > 0) ? `, ${childrenCount} Children` : '';
			guestBtn.textContent = btnText;
			adultsCountEl.textContent = adultsCount;
			childrenCountEl.textContent = childrenCount;

			adultsSubsBtn.classList.toggle("disabled", adultsCount === 1);
			childrenSubsBtn.classList.toggle("disabled", childrenCount === 0);
			const maxReached = calcTotalGuests() === maxNumGuests;
			adultsAddBtn.classList.toggle("disabled", maxReached);
			childrenAddBtn.classList.toggle("disabled", maxReached);
		}

	})();
})(this.jQuery);