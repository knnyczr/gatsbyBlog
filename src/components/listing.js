import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"; 
import styled from 'styled-components'; 

import SEO from "../components/seo"

// this is from gatsby thanks gatsby!
const Post = styled.article` 
    box-shadow: 0px 3px 10px rgba(25, 17, 34, 0.05);
    padding: 1rem;
    border-radius: 4px;
    margin-bottom: 1rem;
    a {
        color: black;
        text-decoration: none;
    } 
    h2 {
        margin-bottom: 0;
    }
    p {
        font-size: 0.8em;
    }
    .readmore{
        font-family: Helvetica; 
        font-size: 0.8rem; 
        text-decoration: underline; 
        color: teal;
    }
`;

const LISTING_QUERY = graphql`
    query BlogPostListing{
        allMarkdownRemark(limit:5, sort: {
            order: DESC,
            fields: [frontmatter___date]
            }) {
            edges {
                node {
                excerpt
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        slug
                    }
                }
            }
        }
    }
`;

const Listing = () => {
    const data = useStaticQuery(LISTING_QUERY);
    return(
        <>
            <SEO title="Home" />
            {
                data.allMarkdownRemark.edges.map(({node}) => (
                    <Post key={node.frontmatter.slug}>
                        <Link to={`/posts${node.frontmatter.slug}`}>
                            <h2>{node.frontmatter.title}</h2>
                        </Link>
                        <p>{node.frontmatter.date}</p>
                        <p>{node.excerpt}</p>
                        <Link class="readmore" to={`/posts${node.frontmatter.slug}`}>Read More</Link>
                    </Post>
                ))
            }
        </>
    )
}

export default Listing
