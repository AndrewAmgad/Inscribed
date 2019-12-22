import React, { Component } from 'react';
import './note-card.css'

class NoteCard extends Component {
    render(){
        
        var text = this.props.text;
        if(this.props.text.length > 500){
            text = this.props.text.substring(0, 500) + "..."
        }

        const darkTextClassName = this.props.darkTextClassName;

        const color = this.props.darkMode ? "note-card-dark-" + this.props.color : "note-card-"  + this.props.color;
        return(
            
            <div onClick={this.props.onClick}  className={"card note-card " + color }>
                <div className="card-info">
                    <h5 className={"card-title mt-2 " +  darkTextClassName}>{this.props.title}</h5>
                    <small className={this.props.darkMode ? "card-date-dark" : "card-date"}>
                        {this.props.date}
                    </small>
                    <div className="card-text mb-2">
                        <text className={"overview " + darkTextClassName }>{text}</text>

                    </div>
                </div>

      </div>
   )
    }
}

export default NoteCard;