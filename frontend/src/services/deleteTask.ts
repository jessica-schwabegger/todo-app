export const deleteTask = async (id: number) => {    
    var requestOptions = {
        method: 'DELETE',
    };

    const response = await fetch(`/deleteTask/${id}`, requestOptions);
    const data = await response.json();
};