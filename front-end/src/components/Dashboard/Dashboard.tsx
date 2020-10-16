import React, { useState, useEffect } from "react";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import M from "materialize-css";
import { changeIndicatorC, changeIndicatorT } from "./Indicators";
import { DashboardTabs } from "./DashboardTabs";

export const Dashboard: React.FC = () => {
    let LSname: any = localStorage.getItem("chartType");
    if (!!LSname) {
        LSname = LSname!.split(",");
    }
    let LSchart: any = localStorage.getItem("chart");
    if (!!LSchart) {
        LSchart = LSchart.split(",");
    }
    let LSdata: any = localStorage.getItem("data");
    if (!!LSdata) {
        LSdata = JSON.parse(LSdata);
    }

    const [state, setState] = useState({ Cards: LSchart || [1] });
    const [chart, setChart] = useState({ name: LSname || ([] as string[]) });
    const {
        title,
        myTicketsByS,
        myTicketsByP,
        myTicketsByT,
        TicketsByP,
        TicketsByS,
        TicketsByT,
    } = DashboardTabs();

    useEffect(() => {
        M.AutoInit();
        var elems = document.querySelectorAll(".fixed-action-btn");
        M.FloatingActionButton.init(elems, {
            hoverEnabled: false,
        });
        elems = document.querySelectorAll(".tooltipped");
        M.Tooltip.init(elems, {
            position: "left",
        });
    });

    const AddCard = (): void => {
        let temp = state.Cards[state.Cards.length - 1];
        let t1 = state.Cards.concat((temp! += 1));
        setState({ ...state, Cards: state.Cards.concat((temp! += 1)) });
        setChart({
            ...chart,
            name: chart.name.concat(""),
        });
        localStorage.setItem("chart", `${t1}`);
        let tmp = chart.name;
        tmp.push("Pie");
        setChart({
            ...chart,
            name: tmp,
        });
        localStorage.setItem("chartType", `${tmp}`);
    };

    const setChartType = (e: React.SyntheticEvent, i: number): void => {
        let target = e.target as any;
        let name = target.name;
        let tmp = chart.name;
        tmp[i] = name;
        if (!!name) {
            setChart({
                ...chart,
                name: tmp,
            });
            localStorage.setItem("chartType", `${tmp}`);
        }
    };

    if (!localStorage.getItem("chartType")) {
        localStorage.setItem("chartType", "Donut");
    }

    return (
        <>
            <div className="fixed-action-btn">
                {/* eslint-disable-next-line */}
                <a
                    className="btn-floating tooltipped btn-large"
                    data-postion="left"
                    data-tooltip="ADD A CHART"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #ff758c 0%, #ff7eb3 100%)",
                    }}
                    onClick={() => {
                        AddCard();
                    }}
                >
                    <i className="material-icons">insert_chart</i>
                </a>
            </div>

            <div className="row">
                {state.Cards.map(function (_val: any, i: any) {
                    return (
                        <div
                            className="col s10 offset-s1 m6 offset-m1 l6 xl4 container"
                            key={i}
                        >
                            <div className="card">
                                <div className="card-content">
                                    <div className="row">
                                        <span className="card-title center">
                                            {title!.title[i]}
                                        </span>
                                    </div>

                                    <div className="divider"></div>

                                    <div className="row row-verticle-center">
                                        <div className="col l12 m12 s12 centered">
                                            {chart.name[i] === "Donut" &&
                                            !!LSdata &&
                                            LSdata[i] ? (
                                                <Doughnut
                                                    data={LSdata[i]}
                                                    options={{
                                                        responsive: true,
                                                    }}
                                                />
                                            ) : null}
                                            {chart.name[i] === "Bar" &&
                                            !!LSdata &&
                                            LSdata[i] ? (
                                                <Bar
                                                    data={LSdata[i]}
                                                    options={{
                                                        responsive: true,
                                                    }}
                                                />
                                            ) : null}
                                            {chart.name[i] === "Pie" &&
                                            !!LSdata &&
                                            LSdata[i] ? (
                                                <Pie
                                                    data={LSdata[i]}
                                                    options={{
                                                        responsive: true,
                                                    }}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                <div className="card-tabs">
                                    <ul className="tabs tabs-fixed-width">
                                        <li className="tab">
                                            <a
                                                className="active"
                                                href={`#tab2${i}`}
                                            >
                                                Tickets
                                            </a>
                                        </li>
                                        <li className="tab">
                                            <a href={`#tab${i}`}>Chart Type</a>
                                        </li>
                                        {/* <li className="tab"><a href={`#tab3${i}`}>Projects</a></li> */}
                                    </ul>
                                </div>

                                <div className="card-content grey lighten-4">
                                    <div id={`tab${i}`}>
                                        <div className="card-tabs">
                                            <ul
                                                id={`ul${i}`}
                                                className="tabs tabs-fixed-width"
                                            >
                                                <li className="tab">
                                                    {/* eslint-disable-next-line */}
                                                    <a
                                                        className="active"
                                                        onClick={() => {
                                                            changeIndicatorC(
                                                                `${i}`,
                                                                "pink"
                                                            );
                                                        }}
                                                    >
                                                        <button
                                                            className="card-opt"
                                                            key={i}
                                                            name={`Donut`}
                                                            onClick={e =>
                                                                setChartType(
                                                                    e,
                                                                    i
                                                                )
                                                            }
                                                        >
                                                            Donut
                                                        </button>
                                                    </a>
                                                </li>
                                                <li
                                                    className="tab"
                                                    onClick={() => {
                                                        changeIndicatorC(
                                                            `${i}`,
                                                            "dark-blue"
                                                        );
                                                    }}
                                                >
                                                    {/* eslint-disable-next-line */}
                                                    <a>
                                                        <button
                                                            className="card-opt"
                                                            key={i}
                                                            name={`Pie`}
                                                            onClick={e => {
                                                                setChartType(
                                                                    e,
                                                                    i
                                                                );
                                                            }}
                                                        >
                                                            Pie
                                                        </button>
                                                    </a>
                                                </li>
                                                <li
                                                    className="tab"
                                                    onClick={() => {
                                                        changeIndicatorC(
                                                            `${i}`,
                                                            "cyan"
                                                        );
                                                    }}
                                                >
                                                    {/* eslint-disable-next-line */}
                                                    <a>
                                                        <button
                                                            className="card-opt"
                                                            key={i}
                                                            name={`Bar`}
                                                            onClick={e => {
                                                                setChartType(
                                                                    e,
                                                                    i
                                                                );
                                                            }}
                                                        >
                                                            Bar
                                                        </button>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div id={`tab2${i}`}>
                                        <ul
                                            id={`ul2${i}`}
                                            className="tabs tabs-fixed-width"
                                        >
                                            <li className="tab my-tickets">
                                                <a
                                                    className="active"
                                                    onClick={() =>
                                                        changeIndicatorT(
                                                            `${i}`,
                                                            "yellow"
                                                        )
                                                    }
                                                    href={`#sub-tab2${i}`}
                                                >
                                                    My Tickets
                                                </a>
                                            </li>
                                            <li className="tab all-tickets">
                                                <a
                                                    href={`#sub-tab2.1${i}`}
                                                    onClick={() =>
                                                        changeIndicatorT(
                                                            `${i}`,
                                                            "blue"
                                                        )
                                                    }
                                                >
                                                    All Tickets
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="card-content grey lighten-4">
                                            <div id={`sub-tab2${i}`}>
                                                <div className="card-tabs">
                                                    <ul
                                                        id={`ul2${i}`}
                                                        className="tabs tabs-fixed-width"
                                                    >
                                                        <li className="tab">
                                                            {/* eslint-disable-next-line */}
                                                            <a className="active yellow-text">
                                                                <button
                                                                    className="card-opt"
                                                                    key={i}
                                                                    onClick={() => {
                                                                        myTicketsByP!(
                                                                            i
                                                                        );
                                                                    }}
                                                                >
                                                                    By Priority
                                                                </button>
                                                            </a>
                                                        </li>
                                                        <li className="tab">
                                                            {/* eslint-disable-next-line */}
                                                            <a>
                                                                <button
                                                                    className="card-opt"
                                                                    key={i}
                                                                    onClick={() => {
                                                                        myTicketsByS!(
                                                                            i
                                                                        );
                                                                    }}
                                                                >
                                                                    By Status
                                                                </button>
                                                            </a>
                                                        </li>
                                                        <li className="tab">
                                                            {/* eslint-disable-next-line */}
                                                            <a>
                                                                <button
                                                                    className="card-opt"
                                                                    key={i}
                                                                    onClick={() => {
                                                                        myTicketsByT!(
                                                                            i
                                                                        );
                                                                    }}
                                                                >
                                                                    By Type
                                                                </button>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div id={`sub-tab2.1${i}`}>
                                                <div className="card-tabs">
                                                    <ul className="tabs tabs-fixed-width">
                                                        <li className="tab">
                                                            {/* eslint-disable-next-line */}
                                                            <a className="active">
                                                                <button
                                                                    className="card-opt"
                                                                    key={i}
                                                                    onClick={() =>
                                                                        TicketsByP!(
                                                                            i
                                                                        )
                                                                    }
                                                                >
                                                                    By Priority
                                                                </button>
                                                            </a>
                                                        </li>
                                                        <li className="tab">
                                                            {/* eslint-disable-next-line */}
                                                            <a>
                                                                <button
                                                                    className="card-opt"
                                                                    key={i}
                                                                    onClick={() =>
                                                                        TicketsByS!(
                                                                            i
                                                                        )
                                                                    }
                                                                >
                                                                    By Status
                                                                </button>
                                                            </a>
                                                        </li>
                                                        <li className="tab">
                                                            {/* eslint-disable-next-line */}
                                                            <a>
                                                                <button
                                                                    className="card-opt"
                                                                    key={i}
                                                                    onClick={() =>
                                                                        TicketsByT!(
                                                                            i
                                                                        )
                                                                    }
                                                                >
                                                                    By Type
                                                                </button>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div id={`tab3${i}`}>
                                        <ul id={`ul3${i}`} className="tabs tabs-fixed-width">
                                            <li className="tab"><a className="active" href={`#sub-tab3${i}`} onClick={() => changeIndicatorP(`${i}`, 'orange')}>My Projects</a></li>
                                            <li className="tab"><a href={`#sub-tab3.1${i}`} onClick={() => changeIndicatorP(`${i}`, 'blue')}>All Projects</a></li>
                                        </ul>
                                        <div className="card-content grey lighten-4">
                                            <div id={`sub-tab3${i}`}>
                                                <div className="card-tabs">
                                                    <ul className="tabs tabs-fixed-width">
                                                        <li className="tab">
                                                            <a className="active">
                                                                <button className="card-opt" key={i}> By Priority </button>
                                                            </a>
                                                        </li>
                                                        <li className="tab">
                                                            <a>
                                                                <button className="card-opt" key={i}> By Status </button>
                                                            </a>
                                                        </li>
                                                        <li className="tab">
                                                            <a>
                                                                <button className="card-opt" key={i}> By Type </button>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div id={`sub-tab3.1${i}`}>
                                                <div className="card-tabs">
                                                    <ul className="tabs tabs-fixed-width">
                                                        <li className="tab">
                                                            <a className="active">
                                                                <button className="card-opt" key={i}> By Priority </button>
                                                            </a>
                                                        </li>
                                                        <li className="tab">
                                                            <a>
                                                                <button className="card-opt" key={i}> By Status </button>
                                                            </a>
                                                        </li>
                                                        <li className="tab">
                                                            <a>
                                                                <button className="card-opt" key={i}> By Type </button>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
