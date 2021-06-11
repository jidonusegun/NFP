import Axios from 'axios';

export async function getContent(url,token,method='GET'){
	try{
		const result = await Axios({url,method, headers: {
			'Authorization': `Bearer ${token}` 
		  }
		});
		return result.data;
		
	} catch(err){
		throw err;
	}
} 

// export async function postContent(url,data,method='POST'){
// 	try{
// 		const result = await Axios({url,method,data});
// 		return result.data;
// 	} catch(err){
// 		throw err;
// 	}
// }

export async function postContent(url,data,token,method='POST'){
	try{
		const config = {url,method,data, headers: {
			'Authorization': `Bearer ${token}` 
		  }
	  }
		console.log(config)
		const result = await Axios(config);
		return result.data;
	} catch(err){
		throw err;
	}
}

export async function postImageContent(url,data,token,method='POST'){
	try{
		// console.log(data)
		const result = await Axios({url,method,data, headers: {
				'content-type': 'multipart/form-data',
			  	'Authorization': `Bearer ${token}` 
			}
		});
		return result.data;
	} catch(err){
		throw err;
	}
}
 
export async function postContentLogin(url,data,method='POST'){
	try{
		// console.log(data)
		const result = await Axios({url,method,data});
		return result.data; 
	} catch(err){
		throw err;
	}
} 


export async function deleteContent(url, token, method='DELETE'){
	try{
		const result = await Axios({url,method, headers: {
			'Authorization': `Bearer ${token}` 
		  }
		});
		return result.data;
	} catch(err){
		throw err;
	}
} 

export async function patchContent(url,data, token,method='PATCH'){

	try{

		const result = await Axios({url,method,data, headers: {
			'Authorization': `Bearer ${token}` 
		  }
		});
		return result.data;
	} catch(err){
		throw err;
	}
} 

export function convertToFormData(values) {
	const data = new FormData();
	for (let key in values) {
	  data.append(key, values[key]);
	}
	return  data;
  }

export const kCount = (value) => {
    if (value < 1000) return String(value);
    else if (value >= 1000 && value < 1000000) {
        return parseInt((value / 1000) * 10) / 10 + 'k+';
    } else if (value >= 1000000 && value < 1000000000) {
        return parseInt((value / 1000000) * 10) / 10 + 'm+';
    } else if (value >= 1000000000) {
        return parseInt((value / 1000000000) * 10) / 10 + 'b+';
    } else return '0';
};