export const Sorting = () => {
    const pagination = (e: React.SyntheticEvent) => {
        let target = e.target as any;
        let id = target.id;
        const els = document.getElementsByClassName("pag-active");
        for (const el of (els as unknown) as any[]) {
            el.classList.remove("active");
            el.classList.remove("pag-active");
        }

        if (!!document.getElementById(`${id}li`)) {
            document.getElementById(`${id}li`)!.classList.add("active");
            document.getElementById(`${id}li`)!.classList.add("pag-active");
        }

        return id;
    };

    const sortByTitle = (arr: any, titleSwitch: string) => {
        if (titleSwitch === "0") {
            let titles = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                titles[i] = arr[i].title;
                titles[i] = titles[i].toLowerCase();
            });

            titles.sort();
            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (arr[i].title.toLowerCase() !== titles[i]) {
                    let tmp = arr.slice(j, j + 2);
                    tmp.reverse(); // will introduce undefined index when reversing final index
                    arr[j] = tmp[0];
                    arr[j + 1] = tmp[1];
                    j = j + 1;

                    if (j === arr.length - 1) {
                        j = i;
                    }

                    if (!arr[arr.length - 1]) {
                        // remove undef index introduced by tmp.reverse()
                        arr.pop();
                    }
                }
            }
            return "1";
        } else {
            let titles = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                titles[i] = arr[i].title;
                titles[i] = titles[i].toLowerCase();
            });

            titles.sort();
            titles.reverse();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (arr[i].title.toLowerCase() !== titles[i]) {
                    let tmp = arr.slice(j, j + 2);
                    tmp.reverse(); // will introduce undefined index when reversing final index
                    arr[j] = tmp[0];
                    arr[j + 1] = tmp[1];
                    j = j + 1;

                    if (j === arr.length - 1) {
                        j = i;
                    }

                    if (!arr[arr.length - 1]) {
                        // remove undef index introduced by tmp.reverse()
                        arr.pop();
                    }
                }
            }
            return "0";
        }
    };

    const sortBySubmitter = (arr: any, submitterSwitch) => {
        if (submitterSwitch === "0") {
            let submitters = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                submitters[i] = arr[i].submitter;
                submitters[i] = submitters[i].toLowerCase();
            });

            submitters.sort();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (arr[i].submitter.toLowerCase() !== submitters[i]) {
                    let tmp = arr.slice(j, j + 2);
                    tmp.reverse(); // will introduce undefined index when reversing final index
                    arr[j] = tmp[0];
                    arr[j + 1] = tmp[1];
                    j = j + 1;

                    if (j === arr.length - 1) {
                        j = i;
                    }

                    if (!arr[arr.length - 1]) {
                        // remove undef index introduced by tmp.reverse()
                        arr.pop();
                    }
                }
            }
            return "1";
        } else {
            let submitters = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                submitters[i] = arr[i].submitter;
                submitters[i] = submitters[i].toLowerCase();
            });

            submitters.sort();
            submitters.reverse();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (arr[i].submitter.toLowerCase() !== submitters[i]) {
                    let tmp = arr.slice(j, j + 2);
                    tmp.reverse(); // will introduce undefined index when reversing final index
                    arr[j] = tmp[0];
                    arr[j + 1] = tmp[1];
                    j = j + 1;

                    if (j === arr.length - 1) {
                        j = i;
                    }

                    if (!arr[arr.length - 1]) {
                        // remove undef index introduced by tmp.reverse()
                        arr.pop();
                    }
                }
            }
            return "0";
        }
    };

    const sortByDeveloper = (arr: any, developerSwitch) => {
        if (developerSwitch === "0") {
            let developers = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                developers[i] = arr[i].developer;
                developers[i] = developers[i].toLowerCase();
            });

            developers.sort();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (arr[i].developer.toLowerCase() !== developers[i]) {
                    let tmp = arr.slice(j, j + 2);
                    tmp.reverse(); // will introduce undefined index when reversing final index
                    arr[j] = tmp[0];
                    arr[j + 1] = tmp[1];
                    j = j + 1;

                    if (j === arr.length - 1) {
                        j = i;
                    }

                    if (!arr[arr.length - 1]) {
                        // remove undef index introduced by tmp.reverse()
                        arr.pop();
                    }
                }
            }
            return "1";
        } else {
            let developers = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                developers[i] = arr[i].developer;
                developers[i] = developers[i].toLowerCase();
            });

            developers.sort();
            developers.reverse();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (arr[i].developer.toLowerCase() !== developers[i]) {
                    let tmp = arr.slice(j, j + 2);
                    tmp.reverse(); // will introduce undefined index when reversing final index
                    arr[j] = tmp[0];
                    arr[j + 1] = tmp[1];
                    j = j + 1;

                    if (j === arr.length - 1) {
                        j = i;
                    }

                    if (!arr[arr.length - 1]) {
                        // remove undef index introduced by tmp.reverse()
                        arr.pop();
                    }
                }
            }
            return "0";
        }
    };

    const sortTicketsByPriority = (arr: any, prioritySwitch: string) => {
        if (prioritySwitch === "0") {
            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (
                    j > 0 &&
                    ((arr[j].priority === "high" &&
                        (arr[j - 1].priority === "medium" ||
                            arr[j - 1].priority === "low")) ||
                        (arr[j].priority === "medium" &&
                            arr[j - 1].priority === "low"))
                ) {
                    let tmp = arr.slice(j - 1, j + 1);
                    tmp.reverse();
                    arr[j - 1] = tmp[0];
                    arr[j] = tmp[1];
                    j = j - 1;
                }
            }
            return "1";
        } else if (prioritySwitch === "1") {
            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (
                    j > 0 &&
                    ((arr[j].priority === "medium" &&
                        (arr[j - 1].priority === "low" ||
                            arr[j - 1].priority === "high")) ||
                        (arr[j].priority === "low" &&
                            arr[j - 1].priority === "high"))
                ) {
                    let tmp = arr.slice(j - 1, j + 1);
                    tmp.reverse();
                    arr[j - 1] = tmp[0];
                    arr[j] = tmp[1];
                    j = j - 1;
                }
            }
            return "2";
        } else if (prioritySwitch === "2") {
            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (
                    j > 0 &&
                    ((arr[j].priority === "low" &&
                        (arr[j - 1].priority === "high" ||
                            arr[j - 1].priority === "medium")) ||
                        (arr[j].priority === "high" &&
                            arr[j - 1].priority === "medium"))
                ) {
                    let tmp = arr.slice(j - 1, j + 1);
                    tmp.reverse();
                    arr[j - 1] = tmp[0];
                    arr[j] = tmp[1];
                    j = j - 1;
                }
            }
            return "0";
        }
    };

    const sortTicketsByStatus = (arr: any, toggle: string) => {
        if (toggle === "0") {
            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (
                    j > 0 &&
                    ((arr[j].status === "open" &&
                        (arr[j - 1].status === "on-hold" ||
                            arr[j - 1].status === "closed")) ||
                        (arr[j].status === "on-hold" &&
                            arr[j - 1].status === "closed"))
                ) {
                    let tmp = arr.slice(j - 1, j + 1);
                    tmp.reverse();
                    arr[j - 1] = tmp[0];
                    arr[j] = tmp[1];
                    j = j - 1;
                }
            }
            return "1";
        } else if (!!arr && toggle === "1") {
            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (
                    j > 0 &&
                    ((arr[j].status === "on-hold" &&
                        (arr[j - 1].status === "closed" ||
                            arr[j - 1].status === "open")) ||
                        (arr[j].status === "closed" &&
                            arr[j - 1].status === "open"))
                ) {
                    let tmp = arr.slice(j - 1, j + 1);
                    tmp.reverse();
                    arr[j - 1] = tmp[0];
                    arr[j] = tmp[1];
                    j = j - 1;
                }
            }
            return "2";
        } else if (!!arr && toggle === "2") {
            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (
                    j > 0 &&
                    ((arr[j].status === "closed" &&
                        (arr[j - 1].status === "open" ||
                            arr[j - 1].status === "on-hold")) ||
                        (arr[j].status === "open" &&
                            arr[j - 1].status === "on-hold"))
                ) {
                    let tmp = arr.slice(j - 1, j + 1);
                    tmp.reverse();
                    arr[j - 1] = tmp[0];
                    arr[j] = tmp[1];
                    j = j - 1;
                }
            }
            return "0";
        }
    };

    const sortTicketsByType = (arr: any) => {
        let t = false;
        for (let i = 0; i < arr.length; i++) {
            let j = i;
            while (
                j > 0 &&
                arr[j].type === "features" &&
                arr[j - 1].type === "bugs/errors"
            ) {
                let tmp = arr.slice(j - 1, j + 1);
                tmp.reverse();
                arr[j - 1] = tmp[0];
                arr[j] = tmp[1];
                j = j - 1;
                t = true;
            }
        }

        if (!t && !!arr) {
            arr.reverse();
        }

        return arr;
    };

    const usernameSort = (arr: any, usernameSwitch: string) => {
        if (usernameSwitch === "0") {
            let usernames = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                usernames[i] = arr[i].username;
                usernames[i] = usernames[i].toLowerCase();
            });

            usernames.sort();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (arr[i].username.toLowerCase() !== usernames[i]) {
                    let tmp = arr.slice(j, j + 2);
                    tmp.reverse(); // will introduce undefined index when reversing final index
                    arr[j] = tmp[0];
                    arr[j + 1] = tmp[1];
                    j = j + 1;

                    if (j === arr.length - 1) {
                        j = i;
                    }

                    if (!arr[arr.length - 1]) {
                        // remove undef index introduced by tmp.reverse()
                        arr.pop();
                    }
                }
            }
            return "1";
        } else {
            let usernames = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                usernames[i] = arr[i].username;
                usernames[i] = usernames[i].toLowerCase();
            });

            usernames.sort();
            usernames.reverse();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (arr[i].username.toLowerCase() !== usernames[i]) {
                    let tmp = arr.slice(j, j + 2);
                    tmp.reverse(); // will introduce undefined index when reversing final index
                    arr[j] = tmp[0];
                    arr[j + 1] = tmp[1];
                    j = j + 1;

                    if (j === arr.length - 1) {
                        j = i;
                    }

                    if (!arr[arr.length - 1]) {
                        // remove undef index introduced by tmp.reverse()
                        arr.pop();
                    }
                }
            }
            return "0";
        }
    };

    const emailSort = (arr: any, emailSwitch: string) => {
        if (emailSwitch === "0") {
            let emails = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                emails[i] = arr[i].email;
                emails[i] = emails[i].toLowerCase();
            });

            emails.sort();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                if (arr[i].email) {
                    while (arr[i].email.toLowerCase() !== emails[i]) {
                        let tmp = arr.slice(j, j + 2);
                        tmp.reverse(); // will introduce undefined index when reversing final index
                        arr[j] = tmp[0];
                        arr[j + 1] = tmp[1];
                        j = j + 1;

                        if (j === arr.length - 1) {
                            j = i;
                        }

                        if (!arr[arr.length - 1]) {
                            // remove undef index introduced by tmp.reverse()
                            arr.pop();
                        }
                    }
                }
            }

            return "1";
        } else if (emailSwitch === "1") {
            let emails = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                emails[i] = arr[i].email;
                emails[i] = emails[i].toLowerCase();
            });

            emails.sort();
            emails.reverse();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                if (arr[i].email) {
                    while (arr[i].email.toLowerCase() !== emails[i]) {
                        let tmp = arr.slice(j, j + 2);
                        tmp.reverse(); // will introduce undefined index when reversing final index
                        arr[j] = tmp[0];
                        arr[j + 1] = tmp[1];
                        j = j + 1;

                        if (j === arr.length - 1) {
                            j = i;
                        }

                        if (!arr[arr.length - 1]) {
                            // remove undef index introduced by tmp.reverse()
                            arr.pop();
                        }
                    }
                }
            }
            return "0";
        }
    };

    const roleSort = (arr: any, roleSwitch: string) => {
        if (roleSwitch === "0") {
            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (
                    j > 0 &&
                    ((arr[j].role === "admin" &&
                        (arr[j - 1].role === "project-manager" ||
                            arr[j - 1].role === "developer")) ||
                        (arr[j].role === "project-manager" &&
                            arr[j - 1].role === "developer"))
                ) {
                    let tmp = arr.slice(j - 1, j + 1);
                    tmp.reverse();
                    arr[j - 1] = tmp[0];
                    arr[j] = tmp[1];
                    j = j - 1;
                }
            }
            return "1";
        } else if (roleSwitch === "1") {
            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (
                    j > 0 &&
                    ((arr[j].role === "project-manager" &&
                        (arr[j - 1].role === "developer" ||
                            arr[j - 1].role === "admin")) ||
                        (arr[j].role === "developer" &&
                            arr[j - 1].role === "admin"))
                ) {
                    let tmp = arr.slice(j - 1, j + 1);
                    tmp.reverse();
                    arr[j - 1] = tmp[0];
                    arr[j] = tmp[1];
                    j = j - 1;
                }
            }
            return "2";
        } else if (roleSwitch === "2") {
            for (let i = 0; i < arr.length; i++) {
                let j = i;
                while (
                    j > 0 &&
                    ((arr[j].role === "developer" &&
                        (arr[j - 1].role === "admin" ||
                            arr[j - 1].role === "project-manager")) ||
                        (arr[j].role === "admin" &&
                            arr[j - 1].role === "project-manager"))
                ) {
                    let tmp = arr.slice(j - 1, j + 1);
                    tmp.reverse();
                    arr[j - 1] = tmp[0];
                    arr[j] = tmp[1];
                    j = j - 1;
                }
            }
            return "0";
        }
    };

    const firstnameSort = (arr: any, fnameSwitch) => {
        if (fnameSwitch === "0") {
            let names = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                names[i] = arr[i].firstname;
                names[i] = names[i].toLowerCase();
            });

            names.sort();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                if (arr[i].firstname) {
                    while (arr[i].firstname.toLowerCase() !== names[i]) {
                        let tmp = arr.slice(j, j + 2);
                        tmp.reverse(); // will introduce undefined index when reversing final index
                        arr[j] = tmp[0];
                        arr[j + 1] = tmp[1];
                        j = j + 1;

                        if (j === arr.length - 1) {
                            j = i;
                        }

                        if (!arr[arr.length - 1]) {
                            // remove undef index introduced by tmp.reverse()
                            arr.pop();
                        }
                    }
                }
            }

            return "1";
        } else {
            let names = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                names[i] = arr[i].firstname;
                names[i] = names[i].toLowerCase();
            });

            names.sort();
            names.reverse();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                if (arr[i].firstname) {
                    while (arr[i].firstname.toLowerCase() !== names[i]) {
                        let tmp = arr.slice(j, j + 2);
                        tmp.reverse(); // will introduce undefined index when reversing final index
                        arr[j] = tmp[0];
                        arr[j + 1] = tmp[1];
                        j = j + 1;

                        if (j === arr.length - 1) {
                            j = i;
                        }

                        if (!arr[arr.length - 1]) {
                            // remove undef index introduced by tmp.reverse()
                            arr.pop();
                        }
                    }
                }
            }
            return "0";
        }
    };

    const lastnameSort = (arr: any, lnameSwitch) => {
        if (lnameSwitch === "0") {
            let names = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                names[i] = arr[i].lastname;
                names[i] = names[i].toLowerCase();
            });

            names.sort();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                if (arr[i].lastname) {
                    while (arr[i].lastname.toLowerCase() !== names[i]) {
                        let tmp = arr.slice(j, j + 2);
                        tmp.reverse(); // will introduce undefined index when reversing final index
                        arr[j] = tmp[0];
                        arr[j + 1] = tmp[1];
                        j = j + 1;

                        if (j === arr.length - 1) {
                            j = i;
                        }

                        if (!arr[arr.length - 1]) {
                            // remove undef index introduced by tmp.reverse()
                            arr.pop();
                        }
                    }
                }
            }

            return "1";
        } else {
            let names = [] as any[];
            // eslint-disable-next-line
            arr.map((_val, i) => {
                names[i] = arr[i].lastname;
                names[i] = names[i].toLowerCase();
            });

            names.sort();
            names.reverse();

            for (let i = 0; i < arr.length; i++) {
                let j = i;
                if (arr[i].lastname) {
                    while (arr[i].lastname.toLowerCase() !== names[i]) {
                        let tmp = arr.slice(j, j + 2);
                        tmp.reverse(); // will introduce undefined index when reversing final index
                        arr[j] = tmp[0];
                        arr[j + 1] = tmp[1];
                        j = j + 1;

                        if (j === arr.length - 1) {
                            j = i;
                        }

                        if (!arr[arr.length - 1]) {
                            // remove undef index introduced by tmp.reverse()
                            arr.pop();
                        }
                    }
                }
            }
            return "0";
        }
    };

    return {
        pagination,
        sortByTitle,
        sortBySubmitter,
        sortByDeveloper,
        sortTicketsByPriority,
        sortTicketsByStatus,
        sortTicketsByType,
        usernameSort,
        roleSort,
        emailSort,
        firstnameSort,
        lastnameSort,
    };
};
