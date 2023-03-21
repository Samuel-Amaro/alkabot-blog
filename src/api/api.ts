import { DataPost } from "../data";

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
    const url = "https://jsonplaceholder.typicode.com/posts";
    const data = await fetchDatas<DataPost[]>(url);
    return data ? data : [];
}