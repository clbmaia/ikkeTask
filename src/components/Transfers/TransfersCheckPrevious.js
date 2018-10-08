import * as moment from 'moment';
import axios from 'axios';

export default async params => {
  let tableData: [];

	try {
		const collection = 'http://localhost:4000/rest/checkTransfer/' + params.contactId + '&' + params.valueTransfer;
		
	    await axios.get(collection, {
	        responseType: 'json'
	    }).then(response => {
	        tableData = response.data;

	    });

		const startDate = tableData[0].createdAt;
		const timeEnd = moment();

		const diff = timeEnd.diff(startDate);
		const diffDuration = moment.duration(diff);

		if(diffDuration.asMilliseconds()<= 120000){
			// console.log('Exclui transação com ID: ', tableData[0]._id);			
			const deleteUrl = 'http://localhost:4000/rest/transfers/'+ tableData[0]._id;
			await axios.delete(deleteUrl, {
	        responseType: 'json'
		    }).then(response => {
		        return 'previousFound';
		    });
				
		} else {
			// console.log('retorna para Salvar a transação atual');
			return true;
		}

	} catch (e) {
		return false;
	}
};

