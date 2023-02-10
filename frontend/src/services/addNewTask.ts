export const addNewTask = async (newTaskValue: string) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskText: newTaskValue })
    };

    const response = await fetch("/addNewTask", requestOptions);
    const data = await response.json();

    if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }
};