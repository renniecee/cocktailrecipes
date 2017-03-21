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
			showAddNewDrink: false,
			showAddNewIngredients: false,
			amount: '',
			ingredients: [],
			drinkName: '',
			drinks: []
		}
		this.showDrinkCart = this.showDrinkCart.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.addDrink = this.addDrink.bind(this);
		this.addCocktail = this.addCocktail.bind(this);
		this.addIngredient = this.addIngredient.bind(this);
		this.addDrink = this.addDrink.bind(this);
		this.resetForm = this.resetForm.bind(this);
		this.removeIng = this.removeIng.bind(this);
		this.displayDrinks = this.displayDrinks.bind(this);
	}
	displayDrinks(){
		this.setState({
			drinks: this.state.drinks
		});
		const dbRef = firebase.database().ref();
		dbRef.push(drinks);
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

		//Clear state for amount and ingredient to clear
		// console.log("new", ingredient);
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

		const newDrinks = [...this.state.drinks, drink]
		this.setState({
			drinks: newDrinks,
		});
		this.resetForm();
	}
	showDrinkCart() {
		this.setState({
			showAddNewDrink: true
		})
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}
	render(){
		return (
			<div className="wrapper">
			<header>
				<div className="title">
					<h2>Drink Savvy</h2>
					<h1>recipes</h1>
				</div>
				<div className="showAdd" onClick={this.showDrinkCart}>
					<p>Add Drink</p>
					<i className="fa fa-plus" aria-hidden="true"></i>
				</div>
			</header>
			
			<section className="addRecipe" ref={ref => this.addrecipe = ref}>
				{ this.state.showAddNewDrink === true ?
						<form onSubmit={this.addDrink}>
							<h3>Add a cocktail</h3>
							<fieldset>
								<input className="drinkName" type="text" name="drinkName" placeholder="Drink name" onChange={this.handleChange} />
							<div>
								<button onClick={this.addCocktail}>Add cocktail</button>
							</div>
							</fieldset>
							{ this.state.showAddNewIngredients === true ? 
								<fieldset>
									<h3>Ingredients</h3>
										<div className="addingredient" onClick={this.showAddInput}>
										<input className="amount" name="amount" type="number" onChange={this.handleChange} value={this.state.amount} /><p className='oz'>oz</p>
										<input className="ingredientName" type="text" name="ingredient" value={this.state.ingredient} placeholder="ingredient" onChange={this.handleChange} />
										<button onClick={this.addIngredient}><i className="fa fa-plus" aria-hidden="true"></i></button>
										</div>
										<ul>
											{this.state.ingredients.map((ing, i) => {
												return <li key={`ing-${i}`} 
												// remove={this.removeIng}
												>{ing.amount}oz {ing.ingredient}</li>
											})}
										</ul>
								</fieldset>
								:
									null
							}
							
							<fieldset>
								<input type="submit" value="add" />
							</fieldset>
						</form>
					:
						null
				}
				
			</section>
			<section className="drinks">
				{this.state.drinks.map((drink, i) => {
					return (
						<div key={`drink-${i}`}>
							<h1>{drink.name}</h1>
							<p>{drink.ingredients[0].amount}oz {drink.ingredients[0].ingredient}</p>
						</div>
					)
				})}
			</section>

			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));