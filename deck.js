var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// deck of playing cards 

//the deck ranks and suits. probably make this a deck prop later
var Ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var Suits = ['♠', '♥', '♣', '♦'];

var Card = function (_React$Component) {
	_inherits(Card, _React$Component);

	function Card() {
		_classCallCheck(this, Card);

		return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
	}

	_createClass(Card, [{
		key: 'render',
		value: function render() {
			//console.log(this.props.front)
			var cardValue = this.props.value;
			var cardClass = "cardBase";
			var rank = '',
			    suit = '';

			if (cardValue) {
				rank = Ranks[cardValue % Ranks.length];
				suit = Suits[cardValue % Suits.length];
				cardClass += cardValue % 2 ? " redText" : " blackText";
				cardClass += " cardFront";
			} else cardClass += " cardEmpty";

			return React.createElement(
				'div',
				{ className: cardClass,
					onClick: this.props.onClick },
				rank,
				React.createElement('br', null),
				suit
			);
		}
	}]);

	return Card;
}(React.Component);

var DeckTable = function (_React$Component2) {
	_inherits(DeckTable, _React$Component2);

	function DeckTable(props) {
		_classCallCheck(this, DeckTable);

		var _this2 = _possibleConstructorReturn(this, (DeckTable.__proto__ || Object.getPrototypeOf(DeckTable)).call(this, props));

		var newDeck = Array.apply(null, Array(Suits.length * Ranks.length)).map(function (x, i) {
			return i + 1;
		});
		_this2.state = {
			suits: Suits,
			ranks: Ranks,
			counter: 0,
			order: newDeck
		};
		return _this2;
	}

	_createClass(DeckTable, [{
		key: 'render',
		value: function render() {
			var _this3 = this;

			var cards = this.state.order;
			var cardIndex = this.state.counter;
			var cardVal = cardIndex > 0 ? cards[cardIndex - 1].toString() : 0;
			var DeckStyle = "cardBase" + (cardIndex == cards.length ? " cardEmpty" : " cardBack");
			return React.createElement(
				'div',
				{ className: 'deckTable' },
				React.createElement('div', { className: DeckStyle,
					onClick: function onClick() {
						return _this3.shiftDeck(1);
					} }),
				React.createElement(Card, { value: cardVal,
					onClick: function onClick() {
						return _this3.shiftDeck(-1);
					} }),
				React.createElement('br', null),
				React.createElement(
					'div',
					{ style: { marginTop: 10 } },
					React.createElement(
						'button',
						{ onClick: function onClick() {
								return _this3.shuffleDeck();
							} },
						'Shuffle'
					),
					React.createElement(
						'button',
						{ style: { float: 'right' }, onClick: function onClick() {
								return _this3.shiftDeck();
							} },
						'Collect'
					)
				)
			);
		}
	}, {
		key: 'shiftDeck',
		value: function shiftDeck(i) {
			var newPos = this.state.counter;
			newPos = i ? Math.min(Math.max(newPos + i, 0), this.state.order.length) : 0;
			this.setState({
				counter: newPos
			});
		}
	}, {
		key: 'shuffleDeck',
		value: function shuffleDeck(input) {
			console.log("shuffling deck");
			var deck = input || this.state.order;
			var position = input ? 0 : this.state.counter;
			for (var swap, i = position; i < deck.length - 1; i++) {
				swap = parseInt(Math.random() * (deck.length - i)) + i;
				var _ref = [deck[swap], deck[i]];
				deck[i] = _ref[0];
				deck[swap] = _ref[1];
			}
			this.setState({
				order: deck
			});
			// console.log(deck)
		}
	}]);

	return DeckTable;
}(React.Component);

var deckRoot = document.getElementById("cards");
ReactDOM.render(React.createElement(DeckTable, null), deckRoot);