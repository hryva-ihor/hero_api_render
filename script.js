let heroesAPI = `https://61e7eaede32cd90017acbe93.mockapi.io/heroes`
let universAPI = `https://61e7eaede32cd90017acbe93.mockapi.io/universe`
let tbody = document.querySelector(`tbody`)
let heroName,heroComics,heroFavouriteInput = ``
let renderArr = []
let selectComix = document.querySelector(`select[data-name="heroComics"]`)
const heroesForm = document.querySelector(`#heroesForm`);

//! CONTROLLER ////////////////////////////////////////
const controller = async (file, method="GET", obj) => {

	let options = {
		method: method,
		headers: {
			"content-type": "application/json"
		}
	}

	if(obj){
		options.body = JSON.stringify(obj)
	}
	// запрос
	let request = await fetch(file, options);
	// проверка выполнения запроса
	if(request.ok){
		return request.json();
	} else{
		throw new Error(request.statusText);
	}
}
//! renderAddHeroTable //////////////////////

const renderAddHeroTable = async (universAPI) => {
	let optArr = []
		try{
			let dataUnivers = await controller(universAPI)

			dataUnivers.map( comix =>{
				optArr.push(`<option value="${comix.name}">"${comix.name}"</option>`)
			})
		}
		catch(err){
			console.log(err);
		}
		return	selectComix.insertAdjacentHTML('afterbegin', optArr.join(``));
}
renderAddHeroTable(universAPI)

//!   REQUEST FUNCTION            ////////////////////////////////////////////
const getHeroData = async (API) => {
	try{
    let data = await controller(API)
	//! render table /////// /  / / / / / / // / / / /  
	const renderHeroTable = (data) => {
		tbody.innerHTML = ``
		renderArr.splice(0)
		data.map(element => {
			renderArr.push(`
				<tr id=tr-id-${element.id}>
					<td>${element.name}</td>
					<td>${element.comics}</td>
					<td>
						<label class="heroFavouriteInput">
							Favourite: <input id="favourite-checkbox-id-${element.id}" data-id="input-checkbox" type="checkbox" ${element.favourite ? `checked` : ``}>
						</label>
					</td>
					<td><button class="btn" data-id="${element.id}" id="deletButton">Delete</button></td>
				</tr>
			`)
		});

		return tbody.innerHTML += renderArr.join(``)
	}	

	renderHeroTable(data)

	//? form send POST


	const chbox = (checkbox) => {
		if(checkbox.checked){
			return true
		}else{
			return false
		}
	}
	heroesForm.addEventListener('change',() => {
		heroName = document.querySelector(`input[data-name="heroName"]`).value,
		heroComics = document.querySelector(`select[data-name="heroComics"]`).value,
		heroFavouriteInput = document.querySelector(`input[type="checkbox"]`)
	});

	//! //      POST HERO                                             
		heroesForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		let check = data.every(function(elem) {
			if (elem.name != heroName && typeof heroName != "undefined") {
				return true;
			} else {
				console.log(`this hero already add or you name is empty`);
				return false;
			}
		});
		if(check){
			( async function () {
				const request = await controller(`${heroesAPI}`, `POST`, {
					name: heroName,
					comics: heroComics,
					favourite: chbox(heroFavouriteInput)
				});
				try{
					console.log(`add hero`)
					tbody.innerHTML +=`
					<tr>
						<td>${heroName}</td>
						<td>${heroComics}</td>
						<td>
							<label class="heroFavouriteInput">
								Favourite: <input " data-id="input-checkbox" type="checkbox" ${chbox(heroFavouriteInput) ? `checked` : ``}>
							</label>
						</td>
						<td><button class="btn" " id="deletButton">Delete</button></td>
					</tr>
				`
				}
				catch(err){
					console.log(err);
				}				
			}());
		}
	});

	//! DELET BUTTON //////////////////////
			document.addEventListener('click', async(e) => { 
			if(e.target && e.target.id == 'deletButton'){
				let data_btn_id = e.target.dataset.id
				let tr = document.getElementById(`tr-id-${data_btn_id}`);
				tbody.removeChild(tr);
	
				try {
					await controller(`${heroesAPI}/${data_btn_id}`, 'DELETE')
					console.log(`delet hero`);

				} catch (err) {
					console.log(err)
				}
			}
		});


		// //! CHENGE FAVOURITE CHECKBOX //////////////////////
		let chboxChange = document.querySelectorAll(`[data-id="input-checkbox"]`)
		// console.log(chboxChange);
		chboxChange.forEach(chbox => {
			// console.log(chbox.outerHTML);
			chbox.addEventListener('change',async () => { 
				let HeroId = chbox.id.replace(/[^0-9]/g, '')
				let checked_uncheked = ``
				chbox.checked ? checked_uncheked = true : checked_uncheked = false;
				try {
					await controller(`${heroesAPI}/${HeroId}`, 'PUT', {favourite: checked_uncheked})
					console.log(`Put hero`);
					
				} catch (err) {
					console.log(err)
				}
		});
		});
	}
	catch(err){
		console.log(err);
	}
}

getHeroData(heroesAPI)
