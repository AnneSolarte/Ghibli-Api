export const getFirstEpisodeName = async (url: string) => {
	try {
		const episodeData = await fetch(url).then((res) => res.json());
		return episodeData.name;
	} catch (error) {
		console.error('Error al obtener datos del episodio:', error);
		return 'Unknown';
	}
};

export default getFirstEpisodeName;
