import React, {useEffect, useState} from 'react'
import Layout from '../../components/Layout'
import { baseUrl, IBlogResult, months } from "../index";
import Image from 'next/image';

export function getServerSideProps(context: any) {
    return {
        props: {params: context.params}
    };
}

type IBlogID = {
    params: any;
}

export default function BlogID({ params }: IBlogID) {
    const [blog, setBlog] = useState<IBlogResult>({ __v: 0, title: '404', image: '/logo.png', views: 0, description: '<p>Not what you were looking 4</p>', _id: '12356959685948', createdAt: new Date()});
    useEffect(() => {
        fetch(`${baseUrl}/blog/get`).then((response) => {
            response.json().then((res) => {
                for (let i = 0; i < res.result.length; i++) {
                    if (res.result[i]._id == params.id) {
                        setBlog(res.result[i]);
                        console.log(res.result[i])
                    }
                }
            });
        });
        fetch(`${baseUrl}/blog/update/views/${params.id}`).then((response) => {
            return
        });
        
    }, []);
    return (
        <Layout>
            <div className="min-h-screen items-center mb-16 flex flex-col flex-wrap w-screen">
                <h1 className="mt-5 text-2xl">{blog && blog.title}</h1>
                { blog && <Image src={blog.image} width={200} height={200} /> }
                <div className="flex flex-wrap text-sm lg:text-md items-center w-9/12 justify-center">
                    <p className="mr-2">{blog && `${months[new Date(blog.createdAt).getMonth()]} ${new Date(blog.createdAt).getDate()}`}</p>
                    <p>Views: {blog && blog.views}</p>
                </div>
                <button onClick={() => navigator.clipboard.writeText(`${window.location.href}`)} className="mt-5 bg-gray-200 hover:bg-white text-white font-bold py-2 px-4 rounded">🔗</button>
                <br />
                {blog && <div className="w-10/12" dangerouslySetInnerHTML={{ __html: blog.description }}></div>}
            </div>
        </Layout>
    )
}
