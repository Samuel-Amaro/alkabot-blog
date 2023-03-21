
export interface DataPost {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export interface DataComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

export interface DataUser {
    id: number;
    name: string;
    username: string;
    email: string;
    address: DataAddress;
    phone: string;
    website: string;
    company: DataCompany;

};

export interface DataAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: DataGeo;
};

export interface DataGeo {
    lat: string;
    lng: string;
};

export interface DataCompany {
    name: string;
    catchPhrase: string;
    bs: string;
};