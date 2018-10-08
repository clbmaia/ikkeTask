import axios from 'axios';


export default async params => {
  let tableData: [];

	try {
		const collection = 'http://localhost:4000/rest/usersAuth/' + params.email + '&' + params.password;
		
	    await axios.get(collection, {
	        responseType: 'json'
	    }).then(response => {
	        tableData = response.data;

	    });
		return tableData;
	} catch (e) {
		return false;
	}
};


