import { connect } from 'react-redux';
import React, { Component } from 'react';
import { readEvents } from '../actions';
import _ from 'lodash';


class EventsIndex extends Component {
    componentDidMount() {        
        this.props.readEvents(); //外部APIサーバーに対して一覧を取得する
    }

    renderEvents() {
        return _.map(this.props.events, event => (
            <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.title}</td>
                <td>{event.title}</td>
            </tr>
        ));
    }
    render() {
        return (
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
        )    
    }
}

const mapStateToProps = state => ({ events: state.events })
const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps,mapDispatchToProps)(EventsIndex)