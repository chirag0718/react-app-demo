import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';
import 'normalize.css/normalize.css';
import '../styles/styles.scss';

export default class InDecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
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

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    }

    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    }

    handleAddOption = (option) => {
        if (!option) {
            return "Option value is required";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option is already exist";
        }
        this.setState((prevState) => ({ options: prevState.options.concat(option) }))

    }

    handlePick = () => {
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[randomNum];
        this.setState(() => ({ selectedOption: option }))
    }

    render() {
        const title = "InDecisionApp";
        const subtitle = "Your life is in computer's hands";
        //const options = ["One", "Two", "Three"];

        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />

            </div>
        );
    }
}