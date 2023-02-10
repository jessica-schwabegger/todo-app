export const updateTask = async (id: number, body: any) => {    
    var requestOptions = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    };

    const response = await fetch(`/updateTask/${id}`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }
};