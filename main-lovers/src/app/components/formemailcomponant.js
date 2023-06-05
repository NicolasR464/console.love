import React from "react";

class FormEmailComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      isvalid: false,
      message: "",
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      email: e.target.value,
    });
  }

  emailValidation() {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !(!this.state.email || regex.test(this.state.email) === false);
  }

  onSubmit() {
    const isEmailValid = this.emailValidation();
    this.setState(
      {
        isvalid: isEmailValid,
        message: isEmailValid
          ? "Email Address is Valid!"
          : "Email Address not valid!",
      },
      () => this.props.onEmailSubmit(this.state)
    );

    // Check if email is valid
    if (this.state.isvalid) {
      console.log(this.state);
    }
  }

  render() {
    const messageTemplate = this.state.message ? (
      <div
        className={"alert alert-" + (this.state.isvalid ? "success" : "danger")}
        role="alert"
      >
        {this.state.message}
      </div>
    ) : (
      ""
    );

    return (
      <div className="child-component">
        <div className="form-group mb-3">
          <label>
            <strong>Email</strong>
          </label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            className="form-control"
          />
        </div>

        <div className="d-grid">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => this.onSubmit()}
          >
            Submit
          </button>
        </div>
        <br />
        {messageTemplate}
      </div>
    );
  }
}

export default FormEmailComponent;