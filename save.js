let heroesAPI = `https://61e7eaede32cd90017acbe93.mockapi.io/heroes`
let universAPI = `https://61e7eaede32cd90017acbe93.mockapi.io/universe`
let tbody = document.querySelector(`tbody`)
let heroName,heroComics,heroFavouriteInput = ``
let renderArr = []
let selectComix = document.querySelector(`select[data-name="heroComics"]`)

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

	const heroesForm = document.querySelector(`#heroesForm`);

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





		// 	const request = await controller(`${heroesAPI}`, `POST`, {
		// 	name: heroName,
		// 	comics: heroComics,
		// 	favourite: chbox(heroFavouriteInput)
		// });
		// try{
		// 	console.log(`add hero`)
		// }
		// catch(err){
		// 	console.log(err);
		// }
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



















	// document.addEventListener("DOMContentLoaded", function() {
	// 	var one = document.getElementById('one');
	// 	one.addEventListener('click', hid, false);
	// });


// document.addEventListener(`DOMContentLoaded`, function(){
// 	const form = document.querySelector(`heroesForm`);
// 	form.addEventListener(`submit`, async e =>{
// 		let FormData = new FormData(form)

// 		const formSend = async (e) =>{
// 			let respons = await fetch(`submit`, {
// 				method: `POST`,
// 				body: FormData
// 			});
	
// 		try{
// 			let form = await controller(API)
// 			console.log(form);
	
// 		}
// 		catch(err){
// 			console.log(err);
// 		}
// 		finally{
// 			console.log(`send`);
// 		}
// 	}
// 	});
// 
// 
// 
// 
// })

// (async () => {
//     try {
//         const heroesForm = document.querySelector(`#heroesForm`);

//         heroesForm.addEventListener('submit',async (e) => {
//             const request = await controller(`${heroesAPI}`);
//             console.log(`hi`)
//         });

//     } catch (err) {
//         console.log(err);
//     }
// })();


// controller(`https://61c9d37520ac1c0017ed8eac.mockapi.io/heroes`)
// 	.then(
// 		data => {
//             console.log(data);
//             // data.forEach(element => {
//             //     console.log(element.name);
//             // });
//         }
// 	)
// controller(`https://61c9d37520ac1c0017ed8eac.mockapi.io/universes`)
// .then(
//     data => {
//         console.log(data);
//         // data.forEach(element => {
//         //     console.log(element.name);
//         // });
//     }
// )
    

// const getCourses = async () => {

// 	try{
// 		let user = await controller(`https://61c9d37520ac1c0017ed8eac.mockapi.io/heroes/name`);
// 		console.log(user);

// 		let role = await controller(`files/${user.role}.json`);
// 		console.log(role);

// 		let courses = await Promise
// 			.allSettled(
// 				role.courses.map(course => controller(`files/courses/${course}.json`))
// 			)
// 			.then(
// 				files => files.filter(file => file.status === "fulfilled").map(file => file.value)
// 			)
// 			.then(
// 				courses => courses.map(course => `${course.icon} ${course.title}`).join(`\n`)
// 			)

// 		console.log(courses);
	
// 	} catch(err){
// 		console.log(err);
// 	}

// };

// getCourses(`https://61c9d37520ac1c0017ed8eac.mockapi.io/heroes`)

// let heroFavouriteInput = document.querySelectorAll('tbody .heroFavouriteInput > input')
//     for (let elem of heroFavouriteInput) {
//         elem.addEventListener('change', async () => {
//             let namePutElem = elem.offsetParent.parentElement.firstElementChild.innerText;
//             let [putElememt] = heroesObj.filter((el) => el.name === namePutElem && el);
//             let objHero = {
//                 id: putElememt.id,
//                 name: putElememt.name,
//                 comics: putElememt.comics,
//                 favourite: elem.checked
//             }
//             await controller(${urlHeros}/${putElememt.id}, 'PUT', objHero);
//         })