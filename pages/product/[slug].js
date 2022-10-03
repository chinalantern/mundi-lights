import React, { useState } from 'react'

import { client, urlFor } from '../../cms/SanityClient'
import { Product } from '../../components'

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai'

// NEXTjs file based routing by way of file nomenclature and nested folder structure

const ProductDetails = ({ products, product }) => {
  const { image, name, details, price } = product
  const [index, setIndex] = useState(0)

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              className="product-detail-image"
              src={urlFor(image && image[index])}
            />
          </div>

          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>

          <div className="product-detail-desc">
            <h1>{name}</h1>

            <div className="reviews">
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>(20)</p>
            </div>

            <h4>Details: </h4>
            <p>{details}</p>

            <p className="price">${price}</p>

            <div className="quantity">
              <h3>Quantity: </h3>
              <p className="quantity-desc">
                <span className="minus" onClick="">
                  <AiOutlineMinus />
                </span>
                <span className="num" onClick="">
                  0
                </span>
                <span className="plus" onClick="">
                  <AiOutlinePlus />
                </span>
              </p>
            </div>

            <div className="buttons">
              <button type="button" className="add-to-cart">
                Add to Cart
              </button>
              <button type="button" className="buy-now">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Similar products the customer may like */}
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  // Kinda like GraphQL here. Defining list of paths to be staticly generated
  // NEXTjs will staticly pre-render all dynamic route paths
  const query = `*[_type == "product"]{
        slug {
            current
        }
    }
    `
  const products = await client.fetch(query)
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

// Instead of using a useEffect hook a la REACT API fetching, we use getServerSideProps()
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do direct database queries.
export const getStaticProps = async ({ params: { slug } }) => {
  // Call an external API endpoint or use any data fetching library
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  const productsQuery = '*[_type == "product"]' // Get all "products" items from sanity

  const product = await client.fetch(query)
  const products = await client.fetch(productsQuery)

  // By returning { props: { products, product} }, the ProductDetails component
  // will receive `products and product` as a prop at build time
  return {
    props: { products, product }, // Passed to the page component as props
  }
}

export default ProductDetails
