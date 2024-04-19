import getFirstEpisodeName from '../../data/getEpisode';
import styles from './character.css';
export enum Attribute {
	'image' = 'image',
	'uid' = 'uid',
	'name' = 'name',
	'status' = 'status',
	'species' = 'species',
	'type' = 'type',
	'origin' = 'origin',
	'url' = 'url',
}

class CharacterCard extends HTMLElement {
	image?: string;
	name?: string;
	status?: string;
	species?: string;
	type?: string;
	origin?: string;
	url?: string;
	uid?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			image: null,
			name: null,
			status: null,
			species: null,
			type: null,
			origin: null,
			url: null,
			uid: null,
		};
		return Object.keys(attrs);
	}
	attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			default:
				this[propName] = newValue;
				break;
		}
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			// Limpiar el contenido existente en el shadowRoot
			this.shadowRoot.innerHTML = '';

			const css = this.ownerDocument.createElement('style');
			css.textContent = `

            .card {
                background-color:rgb(255, 255, 255);
                padding: 2%;
                margin-top: 2%;
                width: min-content;
                height: min-content;
                border-radius: 0.5em;
            }

            button {
                background-color: green;
                color: aliceblue;
                padding: 2%;
                border-radius: 0.4em;
                border: none;
            }

            #button-close{
                padding: 0.5%;
                background-color: white;
                color: black
            }

            .none{
                display: none
            }

            .display{
                display:flex;
                flex-direction: column;
                background-color: green;
                border-radius: 1em;
                padding: 2%;
                position: absolute;
                top: 40%;
                left: 35%;
                color: white

            }

            .display button{
                width: min-content
            }

            `;

			// Adjuntar el estilo al shadowRoot
			this.shadowRoot?.appendChild(css);

			// Crear los elementos de la tarjeta
			const cardDiv = this.ownerDocument.createElement('div');
			cardDiv.className = 'card';

			const heading = this.ownerDocument.createElement('h1');
			heading.textContent = this.name || '';

			const image = this.ownerDocument.createElement('img');
			image.src = this.image || '';
			image.alt = 'Character Image';

			const statusPara = this.ownerDocument.createElement('p');
			statusPara.textContent = `Status: ${this.status || ''}`;

			const speciesPara = this.ownerDocument.createElement('p');
			speciesPara.textContent = `Species: ${this.species || ''}`;

			const typePara = this.ownerDocument.createElement('p');
			typePara.textContent = `Type: ${this.type || 'No type'}`;

			const originPara = this.ownerDocument.createElement('p');
			originPara.textContent = `Origin: ${this.origin || ''}`;

			// Crear el botón
			const button = this.ownerDocument.createElement('button');
			button.className = 'action-button';
			button.id = this.uid || ''; // Asignar un ID al botón si tienes uno disponible
			button.textContent = 'Show episode';

			const message = this.ownerDocument.createElement('h2');

			// Añadir el evento click al botón
			button.addEventListener('click', async () => {
				if (this.url) {
					const episode = await getFirstEpisodeName(this.url);
					message.textContent = `Episode: ${episode || ''}`;
				}
				popUp.classList.add('display');
				popUp.classList.remove('none');
			});

			const hidePopUp = () => {
				popUp.classList.remove('display');
				popUp.classList.add('none');
			};

			// Adjuntar elementos a la tarjeta
			cardDiv.appendChild(heading);
			cardDiv.appendChild(image);
			cardDiv.appendChild(statusPara);
			cardDiv.appendChild(speciesPara);
			cardDiv.appendChild(typePara);
			cardDiv.appendChild(originPara);
			cardDiv.appendChild(button);

			const popUp = this.ownerDocument.createElement('section');
			popUp.className = 'none';

			// Crear el botón para cerrar el popUp
			const closeButton = this.ownerDocument.createElement('button');
			closeButton.id = 'button-close';
			closeButton.textContent = 'Close';
			closeButton.addEventListener('click', hidePopUp);

			// Añadir el botón para cerrar el popUp al popUp
			popUp.appendChild(closeButton);
			popUp.appendChild(message);

			// Adjuntar la tarjeta al shadowRoot
			this.shadowRoot.appendChild(cardDiv);
			this.shadowRoot.appendChild(popUp);
		}
	}
}

export default CharacterCard;
customElements.define('character-card', CharacterCard);
