/* Code for deck drawing system */

//the deck ranks and suits. probably make this a deck prop later
const Ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const Suits = ['♠','♥','♣','♦']

class Card extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			flipped: this.props.flipped || 'false'
		}
	}

	render() {
		//console.log(this.props.front)
		var cardValue = this.props.value
		if(this.state.flipped == 'true') {
			if(cardValue != null){
				var rank = Ranks[cardValue % 13]
				var suit = Suits[cardValue % 4]
				return (
					<div className="cardBase cardFront"
					onClick={this.props.onClick}>
						{rank}<br/>{suit}</div>
				)
			}
			else
				return (
					<div className="cardBase cardEmpty"
					onClick={this.props.onClick}>
						{rank}<br/>{suit}</div>
				)
		}
		else 
			return (
				<div className="cardBase cardBack"
				onClick={this.props.onClick}></div>
			)
	}
}

class DeckTable extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			suits: Suits,
			ranks: Ranks,
			counter: 0,
			order: Array.apply(null, Array(Suits.length * Ranks.length)).map((x, i) => {return i+1})
		}
		// console.log(this.state.order)
	}

	render() {
		var cardIndex = this.state.counter
		var cardVal = (cardIndex > 0) ? this.state.order[cardIndex-1].toString()
			: null
		return(
			<div className="deckTable">
				<Card flipped='false' 
				onClick={() => this.shiftDeck(1)}/>
				<Card flipped='true' value={cardVal} 
				onClick={() => this.shiftDeck(-1)}/>
				<br/>
				<div style={{marginTop: 10 }}>
					<button onClick={() => this.shuffleDeck()}>Shuffle</button>
					<button style={{float: 'right'}} onClick={() => this.shiftDeck()}>Collect</button>
				</div>
			</div>
		)
	}

	shiftDeck(i) {
		var newPos = this.state.counter;
		newPos = i ?
			Math.min(Math.max(newPos + i, 0), this.state.order.length)
			: 0;
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
ReactDOM.render(<DeckTable />, deckRoot);