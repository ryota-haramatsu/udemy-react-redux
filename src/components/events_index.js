import { connect } from 'react-redux';
import React, { Component } from 'react';
import { readEvents } from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';



class EventsIndex extends Component {
    componentDidMount() {          
        this.props.readEvents(); //外部APIサーバーに対して一覧を取得する
    }

    renderEvents() {
        return _.map(this.props.events, event => (
            <tr key={event.id}>
                <td>{event.id}</td>
                <td>
                    <Link to={`/events/${event.id}`}>
                        {event.title}
                    </Link>
                </td>
                <td>{event.body}</td>
            </tr>
        ));
    }
    render() {
        return (
            <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderEvents()}
                </tbody>
            </table>

                <Link to="/events/new">New Events</Link>
                {/* <Link to="/about" style={{marginLeft: 20}}>About</Link> */}
            </React.Fragment>
        )    
    }
}

const mapStateToProps = state => ({ events: state.events })
const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps,mapDispatchToProps)(EventsIndex)