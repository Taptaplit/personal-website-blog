import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";
import { baseUrl, IBlogResult } from "./index";



const Home: NextPage = () => {
    const [blogs, setBlogs] = useState<IBlogResult[]>([]);
    useEffect(() => {
        const arr: IBlogResult[] = [];
        fetch(`${baseUrl}/blog/get`).then((response) => {
            response.json().then((res) => {
                for (let i = 0; i < res.result.length; i++) {
                    arr.push(res.result[i]);
                }
                setBlogs(arr);
            });
        });
    }, []);
    return (
        <Layout title="Taptaplits Blog">
            <main className="min-h-screen mb-16 w-screen">
                <h1 className="text-xl p-2 m-2">All blogs</h1>
                <div className="m-0 p-0 flex flex-wrap justify-around align-center w-11/12 h-auto">
                    {blogs &&
                        blogs.map((blog) => (
                            <div key={blog._id} className="sm:w-6/12">
                                <ProjectCard
                                    id={blog._id}
                                    title={blog.title}
                                    description={blog.description.replace(/<[^>]*>?/gm, "")}
                                    image={blog.image}
                                    timestamp={blog.createdAt}
                                />
                            </div>
                        ))}
                </div>
            </main>
        </Layout>
    );
};

export default Home;
