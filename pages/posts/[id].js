import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'

export default function Post({ postData }) {
    console.log('[i].js - Rendering du composant Post - code exécuté côté client');
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                {postData.title}
                <br />
                {postData.id}
                <br />
                <Date dateString={postData.date} />
                <br />
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    console.log('[i].js - Appel de getStaticPaths - code exécuté côté serveur');
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    console.log('[i].js - Appel de getStaticProps - code exécuté côté serveur');
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}