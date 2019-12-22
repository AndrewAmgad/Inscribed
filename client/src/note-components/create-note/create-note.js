import React, { Component } from 'react';
import './create-note.css'


class CreateNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            rows: 5,
            minRows: 5,
            maxRows: 20,
            enabled: false,
            button: false
        }
        this.enableCard = this.enableCard.bind(this);
        this.disableCard = this.disableCard.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
    }

    enableCard = () => {
        if (!this.state.enabled) {
            this.setState({
                enabled: true
            });
        };
    };

    disableCard = () => {
        if (this.state.enabled) {
            this.setState({
                enabled: false
            });
        };
    };


    onInputChange() {
        const titleInput = this.titleInput ? this.titleInput.value : "";
        const textInput = this.textInput.value;

        if(textInput && titleInput){
            this.setState({
                button: true
            });
        } else {
            this.setState({
                button: false
            });
        };

        const data = {
            title: titleInput,
            text: textInput
        };

        // Send the input data to parent
        this.props.sendInputData(data);
    };

    handleTextAreaChange = (event) => {
        this.onInputChange()
        const textareaLineHeight = 24;
        const { minRows, maxRows } = this.state;

        const previousRows = event.target.rows;
        event.target.rows = minRows; // reset number of rows in textarea 

        const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        }

        this.setState({
            value: event.target.value,
            rows: currentRows < maxRows ? currentRows : maxRows,
        });
    }


    render() {
        return (
            <div style={{ "border": "0px" }} className={"create-bar-container card card-sm " + this.props.darkBackgroundClassName }>
                <div style={{ "paddingLeft": "0px" }} className="card-body create-bar row no-gutters align-items-center border-top-0 border-right-0 border-left-0">

                    <div className="col">
                        {this.state.enabled ?
                            <>
                                <input className="create-bar-input form-control form-control-lg form-control-borderless"
                                    placeholder="Title"
                                    ref={(input) => { this.titleInput = input; }}
                                    onChange={this.onInputChange}
                                     />
                            </>
                            : ""
                        }

                        <textarea className="create-bar-text form-control form-control-lg form-control-borderless" type="search"
                            placeholder="Take a quick note..."
                            rows={this.state.enabled ? this.state.rows : ""}
                            value={this.state.value}
                            style={!this.state.enabled ?
                                { "height": "45px" } :
                                { "height": "auto", "fontSize": "15px" }}
                            onClick={this.enableCard}
                            onChange={this.handleTextAreaChange}
                            ref={(input) => { this.textInput = input; }} />
                            
                        {this.state.enabled ?
                            <>
                                <button
                                    type="button"
                                    className="btn btn-light float-right create-note-button"
                                    onClick={this.disableCard}>Close</button>
                                <button
                                    type="button"
                                    className="btn btn-light float-right create-note-button"
                                    onClick={this.props.createNote}
                                    disabled={!this.state.button}>Save</button>
                            </> : "" }

                    </div>

                </div>
            </div>
        )
    }
}

export default CreateNote