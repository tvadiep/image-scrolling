import axios from "axios";
import { fakeInfo } from "../fakeData";

const apiKey = "pub_26936dc3cbee86f73981f540c6ef67b77cc0c";


export const fetchNews = (): object[] => {
    try {
        return fakeInfo;
        // return axios.get(`https://newsdata.io/api/1/news?apikey=${apiKey}&q=latest&country=au,gb,us,vi `).then((response) => response.data);
    } catch (error: any) {
        throw new Error('Error fetching images: ', error);
    }

}