import React from 'react';
import Modal from '../Modal';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';
import history from '../../history';

class StreamDelete extends React.Component{
    componentDidMount () {
        this.props.fetchStream(this.props.match.params.id);
    }
    onDeleteClick = (props) => {
        this.props.deleteStream(this.props.match.params.id)
    }
    renderActions() {
        return(
            <React.Fragment>
                <button onClick={this.onDeleteClick} className="ui button negative">Delete</button>
                <Link to='/' className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }
    renderContent () {
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?';
        }
        return `Are you sure you want to delete the stream with title: ${this.props.stream.title} `;
    }
   
    render(){
        return(
            <Modal header="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
};
const mapStateToProps = (state, ownProps) => {
    return { stream : state.streams[ownProps.match.params.id]}
};
export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);