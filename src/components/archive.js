import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import styled from 'styled-components'; 

const POST_ARCHIVE_QUERY = graphql`
    query BlogPostArchive{
        allMarkdownRemark(limit:5, sort: {
            order: DESC,
            fields: [frontmatter___date]
            }) {
            edges {
                node {
                    frontmatter {
                        title
                        slug
                    }
                }
            }
        }
    }
`

const ArchivedList = styled.ul`
    padding: 0; 
    margin: 0; 
    list-style: none; 
    a {
        font-family: Helvetica; 
        font-size: 0.8rem; 
        text-decoration: underline; 
        color: teal;
    }
`;

const Archive = () => {
  const data = useStaticQuery(POST_ARCHIVE_QUERY)

  return (
    <>
      <aside>
          <h3>Archive</h3>
          <ArchivedList>
            {data.allMarkdownRemark.edges.map(edge => (
                <li key={edge.node.frontmatter.slug}>
                    <Link to={`/posts${edge.node.frontmatter.slug}`}>
                        {edge.node.frontmatter.title}
                    </Link> 
                </li>
            ))}
          </ArchivedList>
      </aside>
    </>
  )
}


export default Archive
