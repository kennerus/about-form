import React from 'react';
import FormElement from '../common/FormElement';

export default class AboutForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      phone: '',
      password: '',
      repeatPassword: '',
      formErrorName: '',
      formErrorPhone: '',
      formErrorPassword: '',
      formErrorRepeatPassword: '',
      isNameValid: false,
      isPhoneValid: false,
      isPasswordValid: false,
      isRepeatPasswordMatch: false,
      isFormValid: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _onChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  errorClass = error => {
    return (error === ('') ? '' : error === ('valid') ? 'input_done' : 'input_error');
  };

  validateName = async () => {
    const {name} = this.state;

    if (name.length >= 2) {
      await this.setState({isNameValid: true});
      this.setState({formErrorName: 'valid'});
    } else {
      await this.setState({isNameValid: false});
      this.setState({formErrorName: 'invalid'});
    }
  };

  validatePhone = async () => {
    const {phone} = this.state;

    if (phone.match(/^(?!\+.*\(.*\).*\-\-.*$)(?!\+.*\(.*\).*\-$)(\+38\(0[0-9]{2}\)[0-9]{3}[-]{1}[0-9]{2}[-]{1}[0-9]{2})$/)) {
      await this.setState({isPhoneValid: true});
      this.setState({formErrorPhone: 'valid'});
    } else {
      await this.setState({isPhoneValid: false});
      this.setState({formErrorPhone: 'invalid'});
    }
  };

  validatePassword = async () => {
    const {password} = this.state;

    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g)) {
      await this.setState({isPasswordValid: true});
      this.setState({formErrorPassword: 'valid'});
    } else {
      await this.setState({isPasswordValid: false});
      this.setState({formErrorPassword: 'invalid'});
    }
  };

  validateRepeatPassword = async () => {
    const {repeatPassword, password} = this.state;

    if (repeatPassword === password && repeatPassword !== '') {
      await this.setState({isRepeatPasswordValid: true});
      this.setState({formErrorRepeatPassword: 'valid'});
    } else {
      await this.setState({isRepeatPasswordValid: false});
      this.setState({formErrorRepeatPassword: 'invalid'});
    }
  };

  validateForm = async () => {
    const {isNameValid, isPhoneValid, isPasswordValid, isRepeatPasswordMatch} = this.state;

    if (isNameValid && isPhoneValid && isPasswordValid && isRepeatPasswordMatch) {
      await this.setState({isFormValid: true});
    } else {
      await this.setState({isFormValid: false});
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const {name, phone, password, isFormValid} = this.state;

    this.validateForm;

    let formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('password', password);

    if (isFormValid) {
      fetch('/mail2.php', {
        method: 'POST',
        body: formData
      })
      .then(() => alert('Ваше письмо отправлено. В ближайшее время с вами свяжется наш менеджер.'))
      .catch(response => console.log(response))
    } else {
      alert('Заполните все поля.')
    }

  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <FormElement
          labelText="Name"
          inputType="text"
          inputID="inputName"
          inputName="name"
          inputPlaceholder="Enter name *"
          inputChange={this._onChange}
          inputValidate={this.validateName}
          inputError={this.errorClass(this.state.formErrorName)}
        />

        <FormElement
          labelText="Phone"
          inputType="phone"
          inputID="inputPhone"
          inputName="phone"
          inputPlaceholder="Enter phone *"
          inputChange={this._onChange}
          inputValidate={this.validatePhone}
          inputError={this.errorClass(this.state.formErrorPhone)}
        />

        <FormElement
          labelText="Password"
          inputType="password"
          inputID="inputPassword"
          inputName="password"
          inputPlaceholder="Enter password *"
          inputChange={this._onChange}
          inputValidate={this.validatePassword}
          inputError={this.errorClass(this.state.formErrorPassword)}
        />

        <FormElement
          labelText="Repeat Password"
          inputType="password"
          inputID="inputRepeatPassword"
          inputName="repeatPassword"
          inputPlaceholder="Repeat password here *"
          inputChange={this._onChange}
          inputValidate={this.validateRepeatPassword}
          inputError={this.errorClass(this.state.formErrorRepeatPassword)}
        />

        <FormElement
          inputType="submit"
          inputID="submit"
          inputName="submit"
          inputValue="Send"
        />
      </form>
    );
  }
}