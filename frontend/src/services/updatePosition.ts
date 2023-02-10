export const updatePosition = async (id: number, sourceIndex: number, destinationIndex: number) => {

    // var raw = JSON.stringify({ "index": destinationIndex});

    var requestOptions = {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "index": Number(destinationIndex) }),
    };

    const response = await fetch(`/updatePosition/${id}/${sourceIndex}/${destinationIndex}`, requestOptions);
    const data = await response.json();

    if (!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
    }




    // const response = await fetch(`/updatePosition/${id}/${sourceIndex}/${destinationIndex}`);
    // const data = await response.json();
    // return data;

    // if (!response.ok) {
    //     const error = (data && data.message) || response.status;
    //     return Promise.reject(error);
    // }
};