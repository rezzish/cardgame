// story presenting engine

class StoryPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			line: ''
		}
	}

	componentDidMount() {
		fetch('http://localhost:8080/shhh')
			.then( (response) => {
				console.log(response)
			})
	}

	render(){
		return (
			<div>{this.state.line}</div>
		);
	}
}

var deckRoot = document.getElementById("story");
ReactDOM.render(<StoryPage />, deckRoot);