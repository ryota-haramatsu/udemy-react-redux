import { connect } from 'react-redux';
import React, { Component } from 'react';
import { postEvents } from '../actions';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'


class EventsNew extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }
    renderField(field) {
        const { input, label, type, meta: { touched, error } } = field
        
        return (
            <div> 
                <input {...input} placeholder={label} type={type} />
                {touched && error && <span>{error}</span>}
            </div>
        )
    }
    
    async onSubmit(values) { //valuesはactionsから受け取ったもの
        await this.props.postEvents(values)
        this.props.history.push('/')
    }

    render() {
        const { handleSubmit, pristine, submitting, invalid } = this.props;
        console.log(submitting);

        return (
            <React.Fragment>
            <form onSubmit={handleSubmit(this.onSubmit)}>
                <div><Field label="Title" name="title" type="text" component={this.renderField} /></div>
                <div><Field label="Body" name="body" type="text" component={this.renderField} /></div> 
                <div>
                    <button type="submit" disabled={pristine || submitting || invalid}>Submit</button> 
                    <Link to="/">Cancel</Link>    
                </div>
                
            </form>
            </React.Fragment>
        )    
    }
}

const validate = values => {
    const errors = {};

    if (!values.title) errors.title = "Enter a title, please."
    if (!values.body) errors.body = "Enter a body, please."

    return errors;
}

const mapDispatchToProps = ({ postEvents })

export default connect(null, mapDispatchToProps)(
    reduxForm({ validate, form: "eventNewform" })(EventsNew) 
)