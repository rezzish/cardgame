/* Code for deck drawing system */

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			front: false
		}
	}

	render() {
		if(!this.props.front)
		return (
			<div className="card" style={cardStyle}
			onClick={this.props.onClick}>{this.props.value}</div>
		);
	}
}

class DeckTable extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			suits: props.suits,
			ranks: props.ranks,
			counter: 0,
			order: Array.apply(null, Array(props.suits * props.ranks)).map((x, i) => {return i+1})
		}
		// console.log(this.state.order)
	}

	render() {
		var cardIndex = this.state.counter - 1
		var cardVal = (cardIndex >= 0) ? this.state.order[cardIndex].toString()
			: ""
		return(
			<div className="deckTable" style={deckTableStyle}>
				<Card value="X" onClick={() => this.shiftDeck(1)}/>
				<Card value={cardVal} onClick={() => this.shiftDeck(-1)}/>
				<br/>
				<div style={{marginTop: 10 }}>
					<button onClick={() => this.shuffleDeck()}>Shuffle</button>
					<button style={{float: 'right'}} onClick={() => this.shiftDeck(0)}>Collect</button>
				</div>
			</div>
		)
	}

	shiftDeck(i) {
		var newPos = this.state.counter;
		newPos = i ?
			Math.min(Math.max(newPos + i, 0), this.state.order.length)
			: i;
		this.setState({
			counter: newPos
		})
	}

	shuffleDeck() {
		console.log("shuffling deck");
		var deck = this.state.order
		const position = this.state.counter
		for (let swap,i = position; i < deck.length-1; i++) {
			swap = parseInt(Math.random() * (deck.length - i)) + i;
			[deck[i], deck[swap]] = [deck[swap], deck[i]];
		}
		this.setState({
			order: deck
		})
		// console.log(deck)
	}
}

var deckRoot = document.getElementById("content");
var cardStyle = {
	display: 'inline-block',
	width: 75,
	height: 100,
	backgroundColor: 'lightblue',
	marginRight: 10,
	textAlign: 'center',
	verticalAlign: 'middle',
	lineHeight: 6
}
var deckTableStyle = {
	width: 160,
	height: 120,
	padding: 20,
	border: 'solid',
	whiteSpace: 'nowrap'
}
ReactDOM.render(<DeckTable suits="4" ranks="13" />, deckRoot);