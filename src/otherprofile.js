import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        axios
            .get(`/user/${id}.json`)
            .then((response) => {
                console.log("RESP OTHER: ", response.data);
                if (!response.data.profilePic) {
                    response.data.profilePic = "/notyet.png";
                }
                if (response.data.match) {
                    this.props.history.push("/");
                }
                this.setState(response.data);
            })
            .catch((err) => {
                console.log("ERRORE: ", err);
            });
    }

    render() {
        return (
            <div>
                <h1>
                    {this.state.firstname} {this.state.lastname}
                </h1>
                <div>
                    <img className="profile-pic" src={this.state.profilePic} />
                </div>
                <div>
                    {!this.state.draftBio && <p>No bio yet</p>}
                    <p>{this.state.draftBio}</p>
                </div>
            </div>
        );
    }
}
