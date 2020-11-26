import React from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component{
    constructor(props){
        super(props);
        this.videoRef = React.createRef(); //create ref to DOM element
    }
    componentDidMount() {
        const { id } = this.props.match.params;
	//provided by react router -- match--top level property
    //params -- object that list all the different wild card tokens that exist inside the url
        this.props.fetchStream(id);
        this.buildPlayer();  //build the player when the component is first mounted on the screen   
    }
    componentDidUpdate() { //if the component fetches the stream and re-renders
        this.buildPlayer();
    }
    componentWillUnmount() { //cleanup
        this.player.destroy();
    }
    buildPlayer(){
        //if the player is built before and there are no streams available then do nothing
        //takes care of first loading the page and not having access to the stream
        if(this.player || !this.props.stream){
            return;
        }
        //ELSE --- building the player
        const { id } = this.props.match.params;
        this.player = flv.createPlayer({
            type: 'flv',
            url:`http://localhost:8000/live/${id}.flv`
        });
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();    
    }
    render() {
        if(!this.props.stream){
            return <div>Loading...</div>;
        }
        const {title, description } = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} style={{width:'100%'}} controls />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}
export default connect(mapStateToProps, {fetchStream})(StreamShow);