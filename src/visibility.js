class ToggleMenu extends React.Component {

    constructor(props) {
        super(props)
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {
            visibility: false
        }
    }

    handleToggle() {
        this.setState((prevState) => {
            return {
                visibility: !prevState.visibility
            }
        })
    }

    render() {
        return (
            <div>
                <h1>Visibility</h1>
                <button onClick={this.handleToggle}>{this.state.visibility ? "Show Details" : "Hide Details"}</button>
                {
                    this.state.visibility && (
                        <div>
                            <p>This is showing the details</p>
                        </div>
                    )
                }

            </div>

        )
    }
}

ReactDOM.render(<ToggleMenu />, document.getElementById("app"))