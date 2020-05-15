class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.addCounter = this.addCounter.bind(this);
        this.removeCounter = this.removeCounter.bind(this);
        this.resetAll = this.resetAll.bind(this);
        this.state = {
            count: 0
        }
    }

    addCounter() {
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        })
    }

    removeCounter() {
        this.setState((prevState) => {
            return {
                count: (prevState.count == 0) ? prevState.count : prevState.count - 1
            }
        })
    }

    resetAll() {
        this.setState((prevState) => {
            return {
                count : 0
            }
        })
    }

    render() {
        return (
            <div>
            <h1>Count: {this.state.count}</h1>
            <button onClick={this.addCounter}>+</button>
            <button onClick={this.removeCounter}>-</button>
            <button onClick={this.resetAll}>Reset All</button>
            </div>
        )
    }
}

ReactDOM.render(<Counter/>, document.getElementById('app'));
