import React, { useEffect, useState } from "react";
import { Doughnut, Bar, Pie } from "react-chartjs-2";

const chartData = {
    labels: [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
    ],
    datasets: [
        {
            label: "level of thiccness",
            data: [32, 45, 30, 76, 69],
            backgroundColor: [
                "#051937",
                "#A8EB12",
                "#5FFBF1",
                "#E13296",
                "#E0DF31",
            ],
            borderWidth: 4,
        },
    ],
};

export const Card: React.FC = () => {
    const [chart, setChart] = useState({
        name: "",
        title: "Tickets By Type",
    });

    useEffect(() => {
        var elems = document.querySelectorAll(".dropdown-trigger");
        M.Dropdown.init(elems);
    });

    const setChartType = (e: React.SyntheticEvent): void => {
        let target = e.target as HTMLButtonElement;
        let name = target.name;
        if (!name) {
        } else {
            setChart({
                ...chart,
                name,
            });
        }
    };

    return (
        <div className="cardContainer">
            <div className="col xl12 l9 m9 s12">
                <div className="card">
                    <div className="card-content">
                        <div className="row">
                            <span className="card-title">
                                <span className="left">{chart.title}</span>
                                <span className="right">
                                    <a
                                        className="dropdown-trigger btn manage-dropdown"
                                        href="#!"
                                        data-target="ChartDropdown"
                                    >
                                        Chart Type
                                    </a>

                                    <ul
                                        id="ChartDropdown"
                                        className="dropdown-content dropdownassign"
                                    >
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                name="Donut"
                                                onClick={e => setChartType(e)}
                                            >
                                                <i className="material-icons">
                                                    donut_large
                                                </i>
                                                Donut
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                name="Pie"
                                                onClick={e => setChartType(e)}
                                            >
                                                <i className="material-icons">
                                                    pie_chart
                                                </i>
                                                Pie
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                name="Bar"
                                                onClick={e => setChartType(e)}
                                            >
                                                <i className="material-icons">
                                                    format_align_left
                                                </i>
                                                Bar
                                            </button>
                                        </li>
                                    </ul>

                                    <a
                                        className="dropdown-trigger btn manage-dropdown"
                                        href="#!"
                                        data-target="DataDropdown"
                                    >
                                        Data
                                    </a>

                                    <ul
                                        id="DataDropdown"
                                        className="dropdown-content"
                                    >
                                        <li>
                                            <button className="btnDropdown">
                                                Type
                                            </button>
                                        </li>
                                        <li>
                                            <button className="btnDropdown">
                                                Priority
                                            </button>
                                        </li>
                                    </ul>
                                </span>
                            </span>
                        </div>

                        <div className="divider"></div>

                        <div className="row row-verticle-center">
                            <div className="col l12 m12 s12 centered">
                                {chart.name === "Donut" ? (
                                    <Doughnut
                                        data={chartData}
                                        options={{ responsive: true }}
                                    />
                                ) : null}
                                {chart.name === "Bar" ? (
                                    <Bar
                                        data={chartData}
                                        options={{ responsive: true }}
                                    />
                                ) : null}
                                {chart.name === "Pie" ? (
                                    <Pie
                                        data={chartData}
                                        options={{ responsive: true }}
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
