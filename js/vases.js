const BASE_URL = "https://localhost:63342";
const RESOURCE_URL = `${BASE_URL}/vase`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
        const reqParams = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body
        };

        if (body) {
            reqParams.body = JSON.stringify(body);
        }

        return await fetch(`${RESOURCE_URL}${urlPath}`, reqParams);
    } catch (error) {
        console.error("HTTP ERROR: ", error);
    }
};

export const getallVases = async () => {
    const rawResponse = await baseRequest({ method: "GET" });

    return await rawResponse.json();
};

export const postVase = (body) => baseRequest({ method: "POST", body });

export const updateVase = (id, body) => baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteVase = (id) => baseRequest({ urlPath: `/${id}`, method: "DELETE" });