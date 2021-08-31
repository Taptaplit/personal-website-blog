import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import ProjectCard from "../components/ProjectCard";

export const baseUrl = "https://portfolio-backend-mongo-server.herokuapp.com";
export interface IBlogResult {
    title: string;
    description: string;
    image: string;
    createdAt: Date;
    views: number;
    _id: string;
    __v: number;
}

export const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

export interface IBlogArr {
    views: any[];
    recent: any[];
}

const Home: NextPage = () => {
    const [blogs, setBlogs] = useState<IBlogArr>({ views: [], recent: [] });
    useEffect(() => {
        const recent: any[] = [];
        const views: any[] = [];
        const arr: IBlogResult[] = [];
        fetch(`${baseUrl}/blog/get`).then((response) => {
            response.json().then((res) => {
                for (let i = 0; i < res.result.length; i++) {
                    arr.push(res.result[i]);
                    views.push([res.result[i].views, res.result[i]]);
                    recent.push([res.result[i].createdAt, res.result[i]]);
                }
                views.sort(function (a, b) {
                    return a[0] - b[0];
                });
                const viewsReversed: any[] = views.reverse();
                const recentReversed: any[] = recent
                    .sort(function(a: any,b: any){
                        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
                    }).reverse();
                setBlogs({ views: viewsReversed, recent: recentReversed });
            });
        });
    }, []);
    return (
        <Layout title="Taptaplits Blog">
            <main className="min-h-screen mb-16 w-screen">
                <h1 className="text-xl p-2 m-2">Recent blogs</h1>
                <div className="m-0 p-0 flex flex-wrap justify-around align-center w-11/12 h-auto">
                    {blogs.recent &&
                        blogs.recent.slice(0, 6).map((blog) => (
                            <div key={blog[1]._id} className="sm:w-6/12">
                                <ProjectCard
                                    id={blog[1]._id}
                                    title={blog[1].title}
                                    description={blog[1].description.replace(/<[^>]*>?/gm, "")}
                                    image={blog[1].image}
                                    timestamp={blog[1].createdAt}
                                />
                            </div>
                        ))}
                </div>
                <h1 className="text-xl p-2 m-2">Trending blogs</h1>

                <div className="m-0 p-0 flex flex-wrap justify-around align-center w-11/12 h-auto">
                    {blogs.views &&
                        blogs.views.slice(0, 6).map((blog) => (
                            <div key={blog[1]._id} className="sm:w-6/12">
                                <ProjectCard
                                    id={blog[1]._id}
                                    title={blog[1].title}
                                    description={blog[1].description.replace(/<[^>]*>?/gm, "")}
                                    image={blog[1].image}
                                    timestamp={blog[1].createdAt}
                                />
                            </div>
                        ))}
                </div>
            </main>
        </Layout>
    );
};

export default Home;
