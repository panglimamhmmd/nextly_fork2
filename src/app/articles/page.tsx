import React from 'react';
import { Container } from '@/components/Container';
import { gql, wpApolloClient } from '@/app/services/AppoloClient';
import Link from 'next/link';
import Image from 'next/image';
import {
    calculateReadingTime,
    sanitizeExcerpt,
} from '../services/ArticleHandling';
const Articles = async () => {
    const GET_LATEST_POSTs = gql`
        query GetLatestPosts($first: Int, $after: String) {
            posts(first: $first, after: $after) {
                edges {
                    node {
                        id
                        title
                        excerpt
                        date
                        slug
                        featuredImage {
                            node {
                                sourceUrl
                            }
                        }
                        content
                        author {
                            node {
                                name
                                description
                                avatar {
                                    url
                                }
                            }
                        }
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    `;

    const { data } = await wpApolloClient.query({
        // fetchPolicy: 'no-cache',
        query: GET_LATEST_POSTs,
        variables: { first: 10, after: null },
    });

    const articles = data.posts.edges.map(({ node }: any) => ({
        id: node.id,
        title: node.title,
        excerpt: node.excerpt,
        date: new Date(node.date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }),
        slug: node.slug,
        image: node.featuredImage.node.sourceUrl,
        author: node.author.node.name,
        author_image: node.author.node.avatar.url, // Use optional chaining
        content: node.content,
    }));

    console.log(articles);

    return (
        <Container>
            <div id="Header">
                <h1 className="text-center font-bold text-4xl">
                    Latest <span className="text-orange">Articles</span>
                </h1>
            </div>

            <>
                {articles.map((article: any) => (
                    <>
                        <div
                            className="bg-[#fff] dark:bg-gray-100 dark:text-gray-900 rounded-xl shadow-lg hover:shadow-xl "
                            key={article.id}
                        >
                            <div className="container grid grid-cols-12 mx-auto dark:bg-gray-50 my-4">
                                <div
                                    className="bg-no-repeat bg-cover dark:bg-gray-300 col-span-full lg:col-span-4"
                                    style={{
                                        backgroundImage: `url(${article.image})`,
                                        backgroundPosition: 'center center',
                                        backgroundBlendMode: 'multiply',
                                        backgroundSize: 'cover',
                                    }}
                                ></div>

                                <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
                                    <div className="flex justify-start">
                                        <span className=" py-1 text-xs rounded-full dark:bg-red-600 dark:text-gray-50">
                                            {article.date}
                                        </span>
                                    </div>
                                    <a
                                        href={`/articles/${article.slug}`}
                                        className="text-3xl font-semibold"
                                    >
                                        {article.title}
                                    </a>
                                    <p className="flex-1 pt-2">
                                        {sanitizeExcerpt(article.excerpt)}
                                    </p>
                                    <Link
                                        rel="noopener noreferrer"
                                        href={`/articles/${article.slug}`}
                                        className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm dark:text-red-600"
                                    >
                                        <Link
                                            href={`/articles/${article.slug}`}
                                        >
                                            Read more
                                        </Link>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </Link>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex space-x-2">
                                            <Image
                                                src={article.author_image}
                                                width={30}
                                                height={30}
                                                alt="Avatar"
                                                className="rounded-full"
                                            />

                                            {/* <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="w-5 h-5 dark:text-gray-600"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                                    clipRule="evenodd"
                                                ></path>
                                            </svg> */}
                                            <span className="self-center text-sm">
                                                by {article.author}
                                            </span>
                                        </div>
                                        <span className="text-xs">
                                            {calculateReadingTime(
                                                article.content
                                            )}{' '}
                                            read
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </>
        </Container>
    );
};

export default Articles;
