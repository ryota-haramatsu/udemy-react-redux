import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getEvent, deleteEvents, putEvent  } from '../actions';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'

class EventsShow extends Component {
    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params
        if(id) this.props.getEvent(id)
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

    async onDeleteClick() {
        const { id } = this.props.match.params
        await this.props.deleteEvents(id)
        this.props.history.push('/')
    }
    
    async onSubmit(values) { //valuesはactionsから受け取ったもの
        await this.props.putEvent(values)
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
                    <Link to="/" onClick={this.onDeleteClick}>Delete</Link>    
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
const mapStateToProps = (state, ownProps) => {
    const event = state.events[ownProps.match.params.id]
    return {initialValues: event, event}
}
const mapDispatchToProps = ({ deleteEvents, getEvent, putEvent })

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({ validate, form: "eventShowform",enableReinitialize: true  })(EventsShow) 
)