import React from 'react';
import ReactDOM from 'react-dom';


const mouse = {x:0, y:0};

class CanvasComponent extends React.Component {
	constructor(){
		super();
		this.draw = this.draw.bind(this);
		this.clickDown = this.clickDown.bind(this);
	}

	updateCanvas() {
		const ctx = this.refs.canvas.getContext('2d');
		const canvas = document.getElementById('canvas');
		canvas.width = window.innerWidth;
		canvas.height = 500;
		window.onresize = ((e) => {canvas.width = window.innerWidth;});
	}

	// mouseMove(e) {
	// 	mouse.x = e.pageX;
	// 	mouse.y = e.pageY;
	// 	// draw();
	// 	// clickDown();
	// }

	draw(e){

		const ctx = this.refs.canvas.getContext('2d');
		const x = e.pageX - canvas.offsetLeft;
		const y = e.pageY - canvas.offsetTop;

		// ctx.beginPath();
		// ctx.fillStyle = 'black';
		// ctx.arc(x, y, 2, 0, 2*Math.PI);
		// ctx.fill();
		ctx.font = '12px sans-serif';
		ctx.textAlign = 'center';
		ctx.fillText('hurdles', x, y);
		ctx.join(ctx.fillText());
		// clickDown((e) => {ctx.fillText()});
	}

	clickDown(e){
		const ctx = this.refs.canvas.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
		ctx.fillText('jokes', e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
	}

	// clickUp(){
	// 	// ctx.closePath();
	// }

	render(){
		return(
			<canvas ref='canvas' onClick={this.draw} 
			onMouseDown={this.clickDown} 
			// onMouseUp={this.clickUp} 
			id="canvas" />
		)
	}

	componentDidMount(){
		this.updateCanvas();
	}
}



class App extends React.Component {
	render(){
		return (
			<div>
				<h1>Drawwwwwww</h1>
				<CanvasComponent/>
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));
