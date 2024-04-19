import './IndexAbuelo.css';
import getFirstEpisodeName from './data/getEpisode';
import CharacterCard, { Attribute } from './components/Character/character';
import { getCharacters } from './data/dataFetch';

class AppContainer extends HTMLElement {
	characters: any[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	// DESDE AQUIII

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = ``;

			const css = this.ownerDocument.createElement('style');
			css.textContent = `
            .cards-container {
                display: grid;
				grid-template-columns: repeat(3, 1fr);
				width: 100%;
				margin-left: 5%;
            }

			.card-div{
                margin-right: 2%;
                margin-left: 2%;
			}
            `;
			// Adjuntar el estilo al shadowRoot
			this.shadowRoot?.appendChild(css);

			//FORM
			const form = document.createElement('form');
			form.id = 'form';
			form.addEventListener('submit', async (e) => {
				e.preventDefault();
				const DataCharacters = await getCharacters(Number(input.value));
				console.log(DataCharacters);
				this.renderCharacters(DataCharacters);
			});

			const input = document.createElement('input');
			input.type = 'number';
			input.placeholder = 'Intriduce a number here';
			input.name = 'number';
			input.value = '';
			input.className = 'number-input';

			const submitButton = document.createElement('input');
			submitButton.type = 'submit';
			submitButton.value = 'Get';
			submitButton.className = 'submit-input';

			form.appendChild(input);
			form.appendChild(submitButton);

			this.shadowRoot.appendChild(form);
		}
	}

	renderCharacters(DataCharacters: any) {
		// Limpiar el contenedor de tarjetas antes de agregar nuevas tarjetas
		// if(this.shadowRoot) this.shadowRoot.innerHTML = ''
		this.shadowRoot?.querySelectorAll('character-card').forEach((card) => card.remove());

		const cardsContainer = this.ownerDocument.createElement('div');
		cardsContainer.className = 'cards-container';

		DataCharacters.forEach((character: any) => {
			const myCharacter = this.ownerDocument.createElement('character-card') as CharacterCard;
			myCharacter.setAttribute(Attribute.image, character.image);
			myCharacter.setAttribute(Attribute.name, character.name);
			myCharacter.setAttribute(Attribute.status, character.status);
			myCharacter.setAttribute(Attribute.species, character.species);
			myCharacter.setAttribute(Attribute.type, character.type);
			myCharacter.setAttribute(Attribute.origin, character.origin.name);
			myCharacter.setAttribute(Attribute.uid, String(character.id));
			myCharacter.setAttribute(Attribute.url, character.episode[0]); //Aqui envié el segundo link para el llamado del API
			cardsContainer.appendChild(myCharacter);
		});
		this.shadowRoot?.appendChild(cardsContainer);
	}
}

customElements.define('app-container', AppContainer);
