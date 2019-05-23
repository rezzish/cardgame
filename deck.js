// deck of playing cards 

//the deck ranks and suits. probably make this a deck prop later
const Ranks = ['A','2','3','4','5','6','7','8','9','10','J','Q','K']
const Suits = ['♠','♥','♣','♦']

class Card extends React.Component {
	render() {
		//console.log(this.props.front)
		const cardValue = this.props.value
		var cardClass = "cardBase"
		var rank = '', suit = ''

		if(cardValue) {
			rank = Ranks[cardValue % Ranks.length]
			suit = Suits[cardValue % Suits.length]
			cardClass += (cardValue % 2) ? " redText" : " blackText"
			cardClass += " cardFront"
		}
		else cardClass += " cardEmpty"
		
		return (
			<div className={cardClass}
			onClick={this.props.onClick}>
				{rank}<br/>{suit}</div>
		)
	}
}

class DeckTable extends React.Component {
	constructor(props){
		super(props);
		var newDeck = Array.apply(null, Array(Suits.length * Ranks.length)).map((x, i) => {return i+1})
		this.state = {
			suits: Suits,
			ranks: Ranks,
			counter: 0,
			order: newDeck
		}
	}

	render() {
		const cards = this.state.order
		const cardIndex = this.state.counter
		const cardVal = (cardIndex > 0) ? cards[cardIndex-1].toString() : 0
		const DeckStyle = "cardBase" + ((cardIndex == cards.length) ? " cardEmpty" : " cardBack")
		return(
			<div className="deckTable">
				<div className={DeckStyle}
				onClick={() => this.shiftDeck(1)}/>
				<Card value={cardVal} 
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

	shuffleDeck(input) {
		console.log("shuffling deck");
		var deck = input || this.state.order;
		const position = (input) ? 0 : this.state.counter;
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

var deckRoot = document.getElementById("cards");
ReactDOM.render(<DeckTable />, deckRoot);