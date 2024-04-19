export const getCharacters = async (count: number) => {
	try {
		const DataCharacters: any[] = [];

		for (let i = 1; i <= count; i++) {
			const character = await fetch(`https://rickandmortyapi.com/api/character/${i}`).then((response) =>
				response.json()
			);
			DataCharacters.push(character);
		}
		return DataCharacters;
	} catch (error) {
		console.error(error);
		return [];
	}
};
