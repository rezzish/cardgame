var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// story presenting engine

var StoryPage = function (_React$Component) {
	_inherits(StoryPage, _React$Component);

	function StoryPage(props) {
		_classCallCheck(this, StoryPage);

		var _this = _possibleConstructorReturn(this, (StoryPage.__proto__ || Object.getPrototypeOf(StoryPage)).call(this, props));

		_this.state = {
			line: ''
		};
		return _this;
	}

	_createClass(StoryPage, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			fetch('http://localhost:8080/shhh').then(function (response) {
				console.log(response);
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				this.state.line
			);
		}
	}]);

	return StoryPage;
}(React.Component);

var deckRoot = document.getElementById("story");
ReactDOM.render(React.createElement(StoryPage, null), deckRoot);