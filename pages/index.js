import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components/index'
import { client } from '../cms/SanityClient'

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
    {/* {console.log(bannerData)} */}

    <div className="products-heading">
      <h2>Best Selling Products</h2>
      <p>Speakers of many variations</p>
    </div>

    <div className="products-container">
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>

    <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
  </div>
)

// Instead of using a useEffect hook a la REACT API fetching, we use getServerSideProps()
// NEXTjs will pre - rendering the page on each request whether from CMS, API, etc
export const getServerSideProps = async () => {
  // Call an external API endpoint or use any data fetching library
  const query = '*[_type == "product"]' // Get all "products" items from sanity
  const products = await client.fetch(query)

  const bannerQuery = '*[_type == "banner"]' // Get all "banner" items from sanity
  const bannerData = await client.fetch(bannerQuery)

  // By returning { props: { products, bannerData} }, the Home component
  // will receive `products and bannerData` as a prop at build time
  return {
    props: { products, bannerData }, // Passed to this page as props
  }
}

export default Home
