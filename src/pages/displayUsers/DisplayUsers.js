import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import Widget from "../../components/Widget/Widget";
import Card from "../../components/Cards/cards";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
class DisplayUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      loading: true,
    };
  }

  getUserData = async () => {
    await axios
      .get("https://barbery.herokuapp.com/api/users")
      .then((res) => {
        this.setState({
          users: res.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(this.state.users);
  };

  componentDidMount() {
    this.getUserData();
  }
  render() {
    if (this.state.loading) {
      return (
        <div className="sweet-loading">
          <ClipLoader
            size={150}
            color={"#123abc"}
            loading={this.state.loading}
          />
        </div>
      );
    }
    if (this.state.users.length > 0) {
      return (
        <div>
          <Row>
            {this.state.users.map((user) => {
              return (
                <Col xl={4}>
                  <Card
                    client="user"
                    name={user.firstName + " " + user.lastName}
                    email={user.email}
                    pic={user.image?.data}
                    phone={user.phoneNo}
                    status={user.status}
                    id={user._id}
                  />
                </Col>
              );
            })}
          </Row>
          {/* <Row>
        <Col lg={6}>
          <Widget title={"Basic Text Settings"}>
            <p>
              You can use the mark tag to <mark>highlight</mark> text.
            </p>
            <p>
              <del>
                This line of text is meant to be treated as deleted text.
              </del>
            </p>
            <p>
              <ins>
                This line of text is meant to be treated as an addition to the
                document.
              </ins>
            </p>
            <p>
              <small>
                This line of text is meant to be treated as fine print.
              </small>
            </p>
            <p>
              <em>This line rendered as italicized text.</em>
            </p>
            <p>
              <strong>This line rendered as bold text.</strong>
            </p>
          </Widget>
        </Col>
        <Col lg={6}>
          <Widget title={"Text Size"}>
            <h1 className="display-1">Display 1</h1>
            <h1 className="display-2">Display 2</h1>
            <h1 className="display-3">Display 3</h1>
            <h1 className="display-4">Display 4</h1>
          </Widget>
        </Col>
      </Row> */}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DisplayUsers;
