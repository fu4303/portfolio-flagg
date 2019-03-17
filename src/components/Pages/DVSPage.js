import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Button from "components/_ui/Button/Button";
import DvsIcon from 'components/_ui/DvsIcon/DvsIcon';
import Map from "components/Map/Map";
import MapContainer from "components/Map/MapContainer";
import Spinner from "components/_ui/Spinner/Spinner";
import Label from "components/_ui/Label/Label";
import Timeline from "components/Timeline/Timeline";
import data from "dvs_challenge_1_membership_time_space.csv";

const colors = [
    {
        name: "data",
        color: "#29B6A8",
    },
    {
        name: "visualization",
        color: "#F4AE05",
    },
    {
        name: "society",
        color: "#9769F8",
    }
];

class DVSPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userTopOffset: null,
            userLeftOffset: null,
            showData: true,
            showViz: true,
            showSociety: true,
            showMe: true
        }
    }

    toggleData = (name) => {
        if (name === "data") {
            this.setState(prevState => ({
                showData: !prevState.showData
            }));
        } else if (name === "visualization") {
            this.setState(prevState => ({
                showViz: !prevState.showViz
            }));
        } else if (name === "society"){
            this.setState(prevState => ({
                showSociety: !prevState.showSociety
            }));
        } else {
            this.setState(prevState => ({
                showMe: !prevState.showMe
            }));
        }
    }

    setUserOffsets = (top, left) => {
        this.setState({ userTopOffset: top, userLeftOffset: left});
    }

    componentDidMount() {
        this.props.hideNavs();
    }

    render() {
        const { showData, showViz, showSociety, showMe } = this.state;
        return (
            <div className="DVSPage SinglePage">
                <div className="DVSContainer" ref={this.foo}>
                    <div className="DVS__section DVS__section--info">
                        <div className="DVS__credential">
                            <div className="DVS__icon">
                                <DvsIcon />
                            </div>
                            <Link to="/" onClick={this.props.showNavs} className="DVS__link">
                                <Label category="primary">
                                    ← Marguerite.io
                            </Label>
                            </Link>
                        </div>

                        <h1>
                            Data Visualization Society
                        </h1>
                        <p>
                            This map shows the location of membership signups between February 20, 2019 — March 9, 2019.
                        </p>
                        <div className="DVS__InfoKey">
                            <p>
                                Each member was asked to rank their davaviz skills in <strong>Data</strong>,
                                <strong>Visualization</strong>, and <strong>Society</strong>.
                                Each member's color represents their highest ranked skill.
                            </p>
                            <div className="DVS__key__container">
                                {colors.map((color, key) => (
                                    <div key={key}
                                        className={classNames("DVS__key", {
                                            'DVS__key--inactive': (color.name === "data" ? !showData : color.name === "visualization" ? !showViz : !showSociety)
                                        })}
                                         onClick={() => this.toggleData(color.name)}>
                                        <span className="DVS__key__color" style={{ background: color.color }}></span>
                                        <Label className="DVS__key__label">
                                            {color.name}
                                        </Label>
                                    </div>
                                ))}
                                <div
                                    className={classNames("DVS__key", {
                                        'DVS__key--inactive': !showMe
                                    })}
                                    onClick={() => this.toggleData("me")}>
                                    <Spinner className="DVS__key__spooch" />
                                    <Label className="DVS__key__label">
                                        You
                                    </Label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="DVS__section DVS__section--map" >
                        <MapContainer
                            setUserOffsets={this.setUserOffsets}
                            dsvData={data}
                            setLoading={this.setLoading}
                            showMe={showMe}
                            showData={showData}
                            showViz={showViz}
                            showSociety={showSociety}
                        />

                        {/* <Timeline dsvData={data} /> */}

                    </div>
                </div>

            </div>
        );
    }
}

export default DVSPage;