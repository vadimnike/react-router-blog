import React from 'react';
import {validateAll} from 'indicative';
import Axios from 'axios';
import config from '../../config'

export default class SignUp extends React.Component{
  constructor(){
    super();

    this.state={
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {}
    }
  }

  handleInputChange = (e)=>{
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmit = async (e)=>{
    e.preventDefault();

    //validate user data

    const data = this.state;


    const rules = {
      name: 'required|min:6|max:30',
      email: 'required|email',
      password: 'required|min:6|max:30|confirmed',
    };

    const messages = {
      required: 'This {{field}} is required',
      'name.min': 'The minimum symbols is 6',
      'email.email': 'The email is invalid',
      'password.confirmed': 'The password confirmation does not match'
    };

    try{
      await validateAll(data, rules, messages);

      try{
        const response = await Axios.post(`${config.apiUrl}/auth/register`, {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        })

        localStorage.setItem('user', JSON.stringify(response.data.data))
        this.props.setAuthUser(response.data.data)
        this.props.history.push('/')

      } catch(errors){
          // console.log(errors.response);

          const formattedErrrors = {};
          formattedErrrors['email']=errors.response.data.email[0];

          this.setState({
            errors: formattedErrrors
          })
      }
    }catch(errors){
      // console.log(errors);
      const formattedErrors = {};

      errors.forEach( error => formattedErrors[error.field] = error.message);

      // console.log(formattedErrors);

      this.setState({
        errors: formattedErrors
      })
    }
  };


  render(){
    return(
      <div className="mh-fullscreen bg-img center-vh p-20">
        <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
          <h5 className="text-uppercase text-center">Register</h5>
          <br />
          <br />
          <br />
          <form className="form-type-material" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" name="name" onChange={this.handleInputChange} className="form-control" placeholder="Username" />
              {
                this.state.errors['name'] && <small className="text-danger">{this.state.errors['name']}</small>
              }
            </div>
            <div className="form-group">
              <input type="text"  name="email" onChange={this.handleInputChange} className="form-control" placeholder="Email address" />
              {
                this.state.errors['email'] && <small className="text-danger">{this.state.errors['email']}</small>
              }
            </div>
            <div className="form-group">
              <input type="password"  name="password" onChange={this.handleInputChange} className="form-control" placeholder="Password" />
              {
                this.state.errors['password'] && <small className="text-danger">{this.state.errors['password']}</small>
              }
            </div>
            <div className="form-group">
              <input type="password"  name="password_confirmation" onChange={this.handleInputChange} className="form-control" placeholder="Password (confirm)" />
              {
                this.state.errors['password_confirmation'] && <small className="text-danger">{this.state.errors['password_confirmation']}</small>
              }
            </div>
            <br />
            <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
          </form>
          <hr className="w-30" />
          <p className="text-center text-muted fs-13 mt-20">Already have an account?
            <a href="login.html">Sign in</a>
          </p>
        </div>
      </div>
    )
  }
};