import { DataComment, DataPost, DataUser } from "../data";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchDatas<DataType>(url: string) : Promise<DataType | null> {
    try {
        const response = await fetch(url);
        if(response.ok) {
            const datas: DataType = await response.json();
            return datas;
        }
        throw response;
    } catch (error) {
        console.log("Error in fetching data: " + error);
        return null;
    }
}

export async function getAllPosts() {
    const url = BASE_URL + "/posts";
    const data = await fetchDatas<DataPost[]>(url);
    return data ? data : [];
}

export async function getAllCommentsPost(idPost: number) {
    const url = `${BASE_URL}/posts/${idPost}/comments`;
    const data = await fetchDatas<DataComment[]>(url);
    return data ? data : [];
}

export async function getUser(idUser: number) {
    const url = `${BASE_URL}/users/${idUser}`;
    const data = await fetchDatas<DataUser>(url);
    return data ? data : null;
}

export async function getAllUsers() {
    const url = `${BASE_URL}/users`;
    const data = await fetchDatas<DataUser[]>(url);
    return data ? data : [];
}