
var
	pokemon1,
	pokemon2,
	fightResult,
	scheme = ["fire", "wood", "electricity", "water"];

//creating select elements
function createSelect(){
	var
		selects = document.getElementsByClassName("selects");
	console.log(selects[0]);
	console.log(selects[1]);
	for (var i=0; i < scheme.length; i++){
		var
			q1 = document.createElement('option'),
			q2 = document.createElement('option');
			q1.text = scheme[i];
			q2.text = scheme[i];
			selects[0].add(q1);	
			selects[1].add(q2);	
	}
}

//get data from form
function getEl(name){
	return document.getElementById(name);
}
function getData(n){
	return {
		name: getEl("name" + n).value,
		exp: getEl("exp" + n).value,
		element: getEl("element" + n).options[getEl("element" + n).selectedIndex].text
	}
}

//update data on form
function setData(n, obj){
	getEl("name" + n).value = obj.name;
	getEl("exp" + n).value = obj.exp;
	getEl("element" + n).value = obj.element;
	getEl("element" + n).setAttribute("disabled", true);
	getEl("name" + n).setAttribute("disabled", true);
	getEl("exp" + n).setAttribute("disabled", true);
	getEl("createFirst").setAttribute("disabled", true);
	getEl('lvl1').innerHTML = 'lvl=' + obj.lvl;
}

//press button fight
function fightClick(){
	if (pokemon1 == null){
		getEl('message').innerHTML = "Please create first pokemon";
		return 0;
	}
	if (pokemon2 == null){
		getEl('message').innerHTML = "Please create second pokemon";
		return 0;
	}
	fightResult = pokemonFight(pokemon1, pokemon2);
	if (!fightResult.error) {
		console.log("The winner is " + fightResult.winner.name);
		pokemon1 = fightResult.winner;
		pokemon2 = null;
		setData(1, pokemon1);
		getEl('message').innerHTML = "The winner is " + fightResult.winner.name + ((fightResult.winner.lvlup) ? " level increased": "");

	}
	else{
		getEl('message').innerHTML = winner.error;
	}
	
};

//creating both pokemons
function createFirst(){
	var
		data = getData(1);
	console.log(data);
	pokemon1 = new Pokemon(data.name, data.element, data.exp);
	getEl('lvl1').innerHTML = "lvl = " + pokemon1.lvl;
};
function createSecond(){
	var
		data = getData(2);
	pokemon2 = new Pokemon(data.name, data.element, data.exp);
	getEl('lvl2').innerHTML = "lvl = " + pokemon2.lvl;
};

//function Pokemon
function Pokemon(name, element, exp){
	this.name = name || "none";
	this.element = element || "fire";
	this.exp = +exp || 0;
	this.lvl = Math.floor(exp / 1000);

	this.update = function(){
		this.exp += 500;
		if (this.lvl < Math.floor(this.exp/1000)){
			this.lvlup = 1;
		}
		else{
			this.lvlup = 0;
		}
		this.lvl = Math.floor(this.exp/1000);
	}

}

//global function, that compare 2 pokemons by fight scheme
function compare(pok1, pok2){
	var
		index1 = scheme.indexOf(pok1.element),
		index2 = scheme.indexOf(pok2.element);
	if (Math.abs(index1 - index2) == 1 || 
		Math.abs(index1 - index2) == 3){
		if (index1 < index2 || 
			index1+index2 == scheme.length-1){
			console.log(1);
			return {
				"winner": pok1,
				"looser": pok2
				};
		}
		else{
			console.log(2);
			return {
				"winner": pok2,
				"looser": pok1
				};
		}
	}
	else{
		console.log(3);
		return (Math.round(Math.random())) ? {
				"winner": pok1,
				"looser": pok2
				} : 
				{
				"winner": pok2,
				"looser": pok1
				};
	}
}

//function wich return winner pokemon
function pokemonFight(pok1, pok2){
	if (pok1 ==null || pok2 == null){
		return {
			"error": "one, or two pokemon doesnt exist"
		}
	}
	var result = {};
	if (pok1.lvl == pok2.lvl){
		result = compare(pok1,pok2);
	}
	else if (pok1.lvl > pok2.lvl){
		result = {
			"winner" : pok1,
			"looser" : pok2
		}
	}else{
		result = {
			"winner" : pok2,
			"looser" : pok1
		}
	}
	result.winner.update();
	result.looser = null;
	return result;
}