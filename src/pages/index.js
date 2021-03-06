import React from 'react'
import BlogPostsList from '../components/global/blogPostsList'
import TagsList from '../components/global/tagsList'
import GoalsList from '../components/global/goalsList'
import HomepageWidgetBox from '../components/global/homepageWidgetBox'
import Header from '../components/global/header'
import '../assets/styles/main.scss'
const IndexPage = ({ data }) => {
  let allBlogPosts = data.allContentfulBlog.edges
  let blogsWithoutLatestPost = allBlogPosts.slice(1, allBlogPosts.length)
  let featuredPost = allBlogPosts[0]

  return (
    <div className="global-container">
      <Header blogposts={data.allContentfulBlog.edges} />
      <div className="home-container">
        <main>
          <BlogPostsList
            featuredpost={featuredPost.node}
            posts={blogsWithoutLatestPost}
          />
        </main>

        <div>
          <HomepageWidgetBox
            title={'Hello!'}
            img={
              'https://pbs.twimg.com/profile_images/1207348167164989443/WXEErrNJ_400x400.jpg'
            }
          >
            <div style={{ padding: '0.5rem' }}>
              Welcome to my site. I am{' '}
              <a
                href="https://www.linkedin.com/in/donohued/"
                rel="noopener noreferrer"
                target="_blank"
                style={{ padding: 0 }}
              >
                Dan Donohue
              </a>
              , a Boston-based software developer at EF Education First.
            </div>
          </HomepageWidgetBox>
          <HomepageWidgetBox title={'Categories'}>
            <TagsList blogposts={allBlogPosts} />
          </HomepageWidgetBox>
          <HomepageWidgetBox title={'2020 Goals'}>
            <GoalsList />
          </HomepageWidgetBox>
        </div>
      </div>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query SiteTitleQuery {
    allContentfulBlog(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: [publishDate], order: DESC }
    ) {
      edges {
        node {
          author {
            name
            nickname
            avatar {
              resolutions {
                src
              }
            }
            twitterLink
          }
          featuredImage {
            resize(width: 600) {
              src
            }
          }
          id
          publishDate(formatString: "DD MMMM YYYY")
          slug
          tags
          title
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
