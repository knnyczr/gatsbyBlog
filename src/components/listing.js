import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import SEO from "../components/seo"

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
                    <article key={node.frontmatter.slug}>
                        <Link to={`/posts${node.frontmatter.slug}`}>
                            <h2>{node.frontmatter.title}</h2>
                        </Link>
                        <p>{node.frontmatter.date}</p>
                        <p>{node.excerpt}</p>
                        <Link to={`/posts${node.frontmatter.slug}`}>Read More</Link>
                    </article>
                ))
            }
        </>
    )
}

export default Listing
