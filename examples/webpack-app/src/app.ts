import * as UltimateI18n from 'ultimate-i18n-js';

UltimateI18n.setup();

document.addEventListener('DOMContentLoaded', () => {
	const placeholder = document.getElementById('placeholder') as HTMLElement;
	const h1 = document.createElement('h1');
	h1.innerText = 'Hola Mundo';
	h1.setAttribute('i18n-pl', 'Witaj świecie');
	h1.setAttribute('i18n-en', 'Hello world');
	placeholder.appendChild(h1);

	const buttons = document.getElementsByClassName('change-language');
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', () => {
			const lang = (buttons[i] as HTMLButtonElement).innerText;
			UltimateI18n.set(lang);
		})
	}
});
