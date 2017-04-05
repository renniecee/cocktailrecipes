import React from 'react';
import ReactDOM from 'react-dom';


var config = {
    apiKey: "AIzaSyB2J1O0R38V_fpJtMKVQyDuAM2EqYt6KY4",
    authDomain: "drink-savvy.firebaseapp.com",
    databaseURL: "https://drink-savvy.firebaseio.com",
    storageBucket: "drink-savvy.appspot.com",
    messagingSenderId: "81738939097"
  };
  firebase.initializeApp(config);

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			showAddNewDrink: true,
			showAddNewIngredients: false,
			showSubmitCocktail: false,
			amount: '',
			ingredients: ["booze"],
			ingredient:'',
			drinkName: '',
			enableIngredient: false,
			enableAmount: false,
			enableAddInCollection: false,
			drinks: [{
				ingredients: []
			}]
		}
		this.showDrinkCart = this.showDrinkCart.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addDrink = this.addDrink.bind(this);
		this.addCocktail = this.addCocktail.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.addDrink = this.addDrink.bind(this);
		this.resetForm = this.resetForm.bind(this);
		this.removeIng = this.removeIng.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.submitCocktail = this.submitCocktail.bind(this);
		
	}
	componentDidMount() {
	        firebase.database().ref().on('value', (res) => {
	            const userData = res.val();
	            const dataArray = [];
	            for(let objectKey in userData) {
	                userData[objectKey].key = objectKey;
	                dataArray.push(userData[objectKey]);
	            }
	            this.setState({
	                drinks: dataArray
	            })
	        });
	    }
	removeItem(drink){
		const dbRef = firebase.database().ref(drink.key);
		dbRef.remove();


	}
	submitCocktail(e){
		e.preventDefault();
		this.setState({
			showSubmitCocktail: true
		})
	}
	removeIng(ingIndex){
		const ingState = Array.from(this.state.ingredients);
		ingState.splice(ingIndex, 1);
		this.setState({
			ingredients: ingState
		});
	}
	resetForm() {
		this.setState({
			showAddNewDrink: false,
			showAddNewIngredients: false,
			amount: '',
			ingredients: [],
			drinkName: ''
		});
	}

	addCocktail(e) {
		e.preventDefault();
		this.setState({
			showAddNewIngredients: true
		})
	}
	addIngredient(e){
		e.preventDefault();

		const ingredient = {
			amount: this.state.amount,
			ingredient: this.state.ingredient
		}
		const newIngredients = [...this.state.ingredients, ingredient]
		this.setState({
			ingredients: newIngredients,
			amount: '',
			ingredient: ''
		});
	}
	addDrink(e) {
		e.preventDefault(); 	
		const drink = {
			name: this.state.drinkName,	
			ingredients: this.state.ingredients
		};

		const dbRef = firebase.database().ref();
		dbRef.push(drink);

		this.resetForm();
	}
	showDrinkCart() {
		if(this.state.showAddNewDrink === false){
		this.setState({
			showAddNewDrink: true
		})
	} if(this.state.showAddNewDrink === true) {
		this.setState({
			showAddNewDrink: false
		})
	}
	}
	handleChange(e) {
		let ingredient = true;
		let amount = true;
		if(e.target.name === "amount" && e.target.value.length > 0){
			// amount = false;
			console.log('yo');
		}
		if(e.target.name === "ingredient" && e.target.value.length > 0){
			// ingredient = false;
			console.log('ing');
		}
		this.setState({
			[e.target.name]: e.target.value,
			enableIngredient: ingredient,
			enableAmount: amount
		});
	}
	render(){
		return (
			<div className="wrapper">
			<div className="bubble1"></div>
			<div className="bubble2"></div>
			<div className="bubble3"></div>
			<header>
				<div className="showAdd" onClick={this.showDrinkCart}>
					<p>Add Drink</p>
					<i className="fa fa-plus" aria-hidden="true"></i>
				</div>
				<div className="title">
					<h2>Drink Savvy</h2>
					<h1>recipes</h1>
				</div>
				<div className="empty"></div>
			</header>
			
			<div className="main">
			<section className="addRecipe" ref={ref => this.addrecipe = ref}>
				{ this.state.showAddNewDrink === true ?
						<form className="addCocktailForm" onSubmit={this.addDrink}>
							<h3>add a cocktail</h3>
							<fieldset className="drinkNameFieldset">
								<input className="drinkName" type="text" name="drinkName" placeholder="Drink name" onChange={this.handleChange} value={this.state.drinkName} />
							<div>
								<button className="addDrinkName" onClick={this.addCocktail}><i className="fa fa-plus" aria-hidden="true"></i></button>
							</div>
							</fieldset>
							{ this.state.showAddNewIngredients === true ? 
								<fieldset>
									<h3>ingredients</h3>
										<div className="addingredient" onClick={this.showAddInput}>
										<input className="amount" name="amount" type="number" placeholder="2" onChange={this.handleChange} value={this.state.amount} /><p className='oz'>oz</p>
										<input className="ingredientName" type="text" name="ingredient" value={this.state.ingredient} placeholder="ingredient" onChange={this.handleChange} />
										<button className="addIngredientButton" onClick={this.addIngredient} disabled={! (this.state.enableAmount && this.state.enableIngredient)} ><i className="fa fa-plus" aria-hidden="true"></i></button>
										</div>
										<ul>
											{this.state.ingredients.map((ing, i) => {
												return <li key={`ing-${i}`}>{ing.amount}oz {ing.ingredient}<button className="deleteIng" onClick={this.removeIng}><i className="fa fa-times" aria-hidden="true"></i></button></li>
											})}
										</ul>
								</fieldset>
								:
									null
							}
							<fieldset>
								<input className="submitCocktailButton" type="submit" value="Add to collection" />
							</fieldset>
						</form>
					:
						null
				}
				
			</section>
			<section className="drinks">
				{this.state.drinks.map((drink, i) => {
					return (
						<div className="userDrinks" key={`drink-${i}`}>
							<button className="deleteCocktail" onClick={() => this.removeItem(drink)}><i className="fa fa-times" aria-hidden="true"></i></button>
							<h1>{drink.name}</h1>
							<ul>
							{drink.ingredients.map((drink, i) => {
								return <li key={`drink-${i}`}>{drink.amount}oz {drink.ingredient}</li>
							})}
							</ul>
						</div>
					)
				})}
			</section>
			</div>
				<footer>
					<a href="http://www.renniecee.com/drinksavvy/">cocktail calculator</a>
				</footer>
			</div>
		)
	}
}


ReactDOM.render(<App/>, document.getElementById('app'));