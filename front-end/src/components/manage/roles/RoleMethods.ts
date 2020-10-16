import {
    useDeleteUserMutation,
    useUpdateRoleMutation,
} from "../../../generated/graphql";

export const RoleMethods = () => {
    const [updateRole] = useUpdateRoleMutation();
    const [DELETEUSER] = useDeleteUserMutation();

    const deleteUser = async (e: React.SyntheticEvent) => {
        let target = e.target as HTMLButtonElement;
        let userid = target.name;
        let tmp = await DELETEUSER({
            variables: {
                userid,
            },
        });
        if (tmp) {
            window.location.reload();
        } else {
            M.toast({ html: "Error occurred while deleting user" });
        }
    };

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

    const setRole = async (e: React.SyntheticEvent, i: number, data: any) => {
        let target = e.target as any;
        let role = target.value;
        let id = `${data.getUsers![i].id}`;
        if (!id || !role) {
        } else {
            await updateRole({
                variables: {
                    role,
                    id,
                },
            });

            window.location.reload();
        }
    };

    return {
        deleteUser,
        pagination,
        setRole,
    };
};
