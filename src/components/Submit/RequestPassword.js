import axios from 'axios';


export default async params => {
  let tableData: [];

	try {
		const collection = 'http://localhost:4000/rest/'+ params.collection +'/' + params.email;
		
	    await axios.get(collection, {
	        responseType: 'json'
	    }).then(response => {
	    	//console.log(response);
	    });
		return true;
	} catch (e) {
		return false;
	}
};


