import { useUsers } from "@/hooks/useUsers";

export function UsersList() {
    const users = useUsers();

    return (
        <div className="flex flex-col items-center justify-center w-full p-4 space-y-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl font-bold">Users</div>
                {users.data ? users.data.users.map((user: any) => {
                    return (
                        <div className="flex items-center justify-between w-full p-2 border-b">
                            <div key={user.name} className="w-full">
                              {user.name} - {user.role ? user.role : "Unknown"}
                            </div>
                        </div>
                    )

                }) : (
                    <div>No data available...</div>
                )} 
        </div>
    )
}