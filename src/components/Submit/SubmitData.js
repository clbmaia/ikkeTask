export default async params => {
	try {
		const collection = 'http://localhost:4000/rest/' + params.collection;
		await fetch(collection, {
		    method: 'POST',
		    headers: {
		     'Accept': 'application/json',
		     'Content-Type': 'application/json',
		    },
		    body: JSON.stringify(params)
        });
		return true;
	} catch (e) {
		return false;
	}
};


