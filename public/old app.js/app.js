class InDecisionApp extends React.Component {

    constructor(props) {
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options: []
        }
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem("options");
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }))
            }
        } catch (e) {
            //fetch the error
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.options.length != prevState.options.length) {
            let json = JSON.stringify(this.state.options);
            localStorage.setItem("options", json);
        }
    }

    componentWillUnmount() {
        console.log("componentWillUnmount");
    }

    handleDeleteOptions() {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption(optionToRemove) {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }

    handleAddOption(option) {
        if (!option) {
            return "Option value is required";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option is already exist";
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }))

    }

    handlePick() {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        alert(option);
    }

    render() {
        const title = "InDecisionApp";
        const subtitle = "Your life is in computer's hands";
        //const options = ["One", "Two", "Three"];

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handlePick={this.handlePick}
                />
                <Options
                    options={this.state.options}
                    handleDeleteOptions={this.handleDeleteOptions}
                    handleDeleteOption={this.handleDeleteOption}
                />
                <AddOption handleAddOption={this.handleAddOption} />
            </div>
        );
    }
}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>Remove All</button>
            {
                props.options.length === 0 && <p>Please enter option to started!</p>
            }
            {
                props.options.map((option) => <Option key={option} handleDeleteOption={props.handleDeleteOption} optionText={option} />)
            }
        </div>
    );
}

ReactDOM.render(<InDecisionApp />, document.getElementById('app'));