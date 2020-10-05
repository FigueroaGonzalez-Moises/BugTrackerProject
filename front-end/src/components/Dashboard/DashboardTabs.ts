import { useState } from "react";
import { useGetUserTickets } from "./useGetUserTickets";
import { useGetTickets } from "./useGetTickets";

export const DashboardTabs = () => {
    let LStitle: any = localStorage.getItem("title");
    if (!!LStitle) {
        LStitle = LStitle!.split(",");
    }
    const [title, setTitle] = useState({ title: LStitle || ([] as string[]) });
    // eslint-disable-next-line
    const [chartData, setChartData] = useState({ chart: [{}] });
    const userTickets = useGetUserTickets() as [
        { priority: string; status: string; type: string }
    ];
    const tickets = useGetTickets() as [
        { priority: string; status: string; type: string }
    ];

    if (!tickets || !userTickets) {
        return {};
    }

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (_key: any, value: any) => {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };

    const myTicketsByT = (i: number) => {
        var be = 0,
            f = 0;
        for (let i = 0; i < userTickets.length; i++) {
            switch (userTickets[i].type) {
                case "features": {
                    f++;
                    break;
                }

                case "bugs/errors": {
                    be++;
                    break;
                }
            }
        }

        let tmp = chartData.chart;
        let val = {
            labels: ["Bugs/Erros", "Features"],
            datasets: [
                {
                    label: "Amount of Tickets",
                    data: [be, f, 0],
                    backgroundColor: [
                        "#051937",
                        "#A8EB12",
                        "#5FFBF1",
                        "#E13296",
                        "#E0DF31",
                    ],
                    borderWidth: 2,
                },
            ],
        };
        tmp[i] = val;
        localStorage.setItem(
            "data",
            JSON.stringify(tmp, getCircularReplacer())
        );

        let t = title.title;
        t[i] = "My Tickets By Type";
        setTitle({ title: t });
        localStorage.setItem("title", `${t}`);
    };

    const myTicketsByP = (i: number) => {
        var h = 0,
            m = 0,
            l = 0;

        for (let i = 0; i < userTickets.length; i++) {
            switch (userTickets[i].priority) {
                case "high": {
                    h++;
                    break;
                }

                case "medium": {
                    m++;
                    break;
                }

                case "low": {
                    l++;
                    break;
                }
            }
        }
        let tmp = chartData.chart;
        let val = {
            labels: ["High", "Medium", "Low"],
            datasets: [
                {
                    label: "Amount of Tickets",
                    data: [h, m, l, 0],
                    backgroundColor: [
                        "#051937",
                        "#A8EB12",
                        "#5FFBF1",
                        "#E13296",
                        "#E0DF31",
                    ],
                    borderWidth: 2,
                },
            ],
        };
        tmp[i] = val;
        localStorage.setItem(
            "data",
            JSON.stringify(tmp, getCircularReplacer())
        );
        let t = title.title;
        t[i] = "My Tickets By Priority";
        setTitle({ title: t });
        localStorage.setItem("title", `${t}`);
    };

    const TicketsByP = (i: number) => {
        var h = 0,
            m = 0,
            l = 0;

        for (let i = 0; i < tickets.length; i++) {
            switch (tickets[i].priority) {
                case "high": {
                    h++;
                    break;
                }

                case "medium": {
                    m++;
                    break;
                }

                case "low": {
                    l++;
                    break;
                }
            }
        }

        let tmp = chartData.chart;
        let val = {
            labels: ["High", "Medium", "Low"],
            datasets: [
                {
                    label: "Amount of Tickets",
                    data: [h, m, l, 0],
                    backgroundColor: [
                        "#051937",
                        "#A8EB12",
                        "#5FFBF1",
                        "#E13296",
                        "#E0DF31",
                    ],
                    borderWidth: 2,
                },
            ],
        };
        tmp[i] = val;
        localStorage.setItem(
            "data",
            JSON.stringify(tmp, getCircularReplacer())
        );
        let t = title.title;
        t[i] = "All Tickets By Priority";
        setTitle({ title: t });
        localStorage.setItem("title", `${t}`);
    };

    const myTicketsByS = (i: number) => {
        var o = 0,
            c = 0,
            h = 0;
        for (let i = 0; i < userTickets.length; i++) {
            switch (userTickets[i].status) {
                case "open": {
                    o++;
                    break;
                }

                case "closed": {
                    c++;
                    break;
                }

                case "on-hold": {
                    h++;
                    break;
                }
            }
        }

        let tmp = chartData.chart;
        let val = {
            labels: ["Open", "Closed", "On Hold"],
            datasets: [
                {
                    label: "Amount of Tickets",
                    data: [o, c, h, 0],
                    backgroundColor: [
                        "#051937",
                        "#A8EB12",
                        "#5FFBF1",
                        "#E13296",
                        "#E0DF31",
                    ],
                    borderWidth: 2,
                },
            ],
        };
        tmp[i] = val;
        localStorage.setItem(
            "data",
            JSON.stringify(tmp, getCircularReplacer())
        );

        let t = title.title;
        t[i] = "My Tickets By Status";
        setTitle({ title: t });
        localStorage.setItem("title", `${t}`);
    };

    const TicketsByS = (i: number) => {
        var o = 0,
            c = 0,
            h = 0;
        for (let i = 0; i < tickets.length; i++) {
            switch (tickets[i].status) {
                case "open": {
                    o++;
                    break;
                }

                case "closed": {
                    c++;
                    break;
                }

                case "on-hold": {
                    h++;
                    break;
                }
            }
        }

        let tmp = chartData.chart;
        let val = {
            labels: ["Open", "Closed", "On Hold"],
            datasets: [
                {
                    label: "Amount of Tickets",
                    data: [o, c, h, 0],
                    backgroundColor: [
                        "#051937",
                        "#A8EB12",
                        "#5FFBF1",
                        "#E13296",
                        "#E0DF31",
                    ],
                    borderWidth: 2,
                },
            ],
        };
        tmp[i] = val;
        localStorage.setItem(
            "data",
            JSON.stringify(tmp, getCircularReplacer())
        );

        let t = title.title;
        t[i] = "All Tickets By Status";
        setTitle({ title: t });
        localStorage.setItem("title", `${t}`);
    };

    const TicketsByT = (i: number) => {
        var be = 0,
            f = 0;
        for (let i = 0; i < tickets.length; i++) {
            switch (tickets[i].type) {
                case "features": {
                    f++;
                    break;
                }

                case "bugs/errors": {
                    be++;
                    break;
                }
            }
        }

        let tmp = chartData.chart;
        let val = {
            labels: ["Bugs/Erros", "Features"],
            datasets: [
                {
                    label: "Amount of Tickets",
                    data: [be, f, 0],
                    backgroundColor: [
                        "#051937",
                        "#A8EB12",
                        "#5FFBF1",
                        "#E13296",
                        "#E0DF31",
                    ],
                    borderWidth: 2,
                },
            ],
        };
        tmp[i] = val;
        localStorage.setItem(
            "data",
            JSON.stringify(tmp, getCircularReplacer())
        );

        let t = title.title;
        t[i] = "All Tickets By Type";
        setTitle({ title: t });
        localStorage.setItem("title", `${t}`);
    };

    return {
        title,
        myTicketsByT,
        myTicketsByP,
        myTicketsByS,
        TicketsByP,
        TicketsByS,
        TicketsByT,
    };
};
