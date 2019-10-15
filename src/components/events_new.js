import { connect } from 'react-redux';
import React, { Component } from 'react';
// import { postEvent } from '../actions';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'



class EventsNew extends Component {
    renderField(field) {
        const { input, label, type, meta: { touched, error } } = field
        
        return (<div></div>)
    }

    render() {
        return (
            <React.Fragment>
            <form>
                <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
                <div><Field label="Body" name="body" type="text" component={this.renderField} /></div> 
                <div>
                    <button type="submit" disabled={false}>Submit</button>
                    <Link to="/">Cancel</Link>    
                </div>
                
            </form>
            </React.Fragment>
        )    
    }
}

// const mapDispatchToProps = ({ postEvent })
const validate = value => {
    const errors = {};

    return errors;
}
export default connect(null, null)(
    reduxForm({ validate, form: "eventNewform" })(EventsNew) 
)