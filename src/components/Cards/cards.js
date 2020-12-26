import React, { Component } from "react";
import "./cards.css";
import Switch from "react-switch";
import axios from "axios";
import image from "./barber-vector.png";
export class Cards extends Component {
  constructor(props) {
    super(props);
    const { name, email, pic, phone, status, id, client } = props;

    this.state = {
      name,
      email,
      pic,
      phone,
      status,
      id,
      client,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(status, id) {
    console.log(status + "from handled");

    axios
      .put(
        `https://barbery.herokuapp.com/api/admin/${this.state.client}/${id}`,
        { status }
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          status: res.data.status,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { name, email, pic, phone, status, id } = this.state;

    return (
      <div>
        <div className="UserCard">
          <div className="UserCardTop">
            <img
              src={pic ? `data:image/png;base64,${pic}` : image}
              alt="user profile img"
            />
          </div>
          <div className="UserCardBottom">
            <h3>{name}</h3>
            <div>{""}</div>
            <h5>Email</h5>
            <p>{email}</p>
            <h5>Cell No.</h5>
            <p>{phone}</p>
            <label>
              <span>Deactive</span>
              <Switch
                onChange={(val) => this.handleChange(val, id)}
                checked={status}
              />
              <span>Active</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;
