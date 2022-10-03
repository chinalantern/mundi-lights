import React from 'react'

import Link from 'next/link'
import { urlFor } from '../cms/SanityClient'

const FooterBanner = ({
  footerBanner: {
    discount,
    smallText,
    midText,
    largeText1,
    largeText2,
    saleTime,
    product,
    desc,
    buttonText,
    image,
  },
}) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left"></div>
        <p>{discount}</p>
        <h3>{largeText1}</h3>
        <h3>{largeText2}</h3>
        <p>{saleTime}</p>

        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <img src={urlFor(image)} className="footer-banner-image" />
      </div>
    </div>
  )
}

export default FooterBanner
