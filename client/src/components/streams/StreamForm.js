import React from 'react';
import { Field, reduxForm } from 'redux-form'; 
//Field is a react component shown in the screen
//reduxForm is a function--same as connect --- used to make calls to action creator and get form data into the component 

class StreamForm extends React.Component {   
    renderError({touched, error}) {
        if(error && touched) {
            return (
                <div className="ui error message">
                    <div className ="header">
                        {error}
                    </div>
                </div>
            )
        }
    }    
    renderInput = ({input, label, meta }) => {  //destructuring formProps /// meta comes from validate func
        //will get arguments passed from the Field component when calling the helper function
        // console.log(meta)
        const className = `field ${meta.touched && meta.error ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/> {/*//add input object (with key value pairs) as properties to input element */}
				{/*all the properties and event handlers on the object (field.input) 
        to be communicated as props to input tag */}
                                    {/* //will have other properties beside value and onchange with the syntax above */}
                {this.renderError(meta)}
            </div>
        ); 
    }

    onSubmit = (formValues) => {
       // event.preventDefault(); //automatically called by redux-form --not called with event object
       //called with values that are existed inside the two field inputs
       this.props.onSubmit(formValues); //onSubmit comes from the ReduxForm to StreamForm
    }

    render(){
        // console.log(this.props) //check the object that are passed from redux Form to view different methods
        return (
		//redux side to form validation is done by this.props.handleSubmit which takes
      //a function as an argurment that passes the values out of the form
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}
//validate-- called everytime the form is initially rendered or when user interacts it with 
const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    } 
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
	  //if error is empty, the form is file to submit
  //if error, redux form assumes form is invalid
};

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);