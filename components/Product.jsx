import React from 'react'

import Link from 'next/link' // Link the product detils page
import { urlFor } from '../cms/SanityClient' // Get product url from Sanity Dashbord

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      {/* Unique character slug */}
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            className="product-image"
            src={urlFor(image && image[0])}
            width={250}
            height={250}
          />
          <p className="product-name">{name} </p>
          <p className="product-price">${price} </p>
        </div>
      </Link>
    </div>
  )
}

export default Product
