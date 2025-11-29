import React, { useState } from 'react';
import "./styles.css";

const CoinInfo = ({ heading, description }) => {
  const shortdesc = description.slice(0, 380);
  const longdesc = description;
  const [flag, setFlag] = useState(false);

  return (
    <div className='coininfo-element-wrapper'>
      <h2 className='coininfo-heading'>{heading}</h2>
      {description.length > 380 ? (
        flag ? (
          <>
            <p className='coininfo-description' dangerouslySetInnerHTML={{ __html: shortdesc + '...' }} />
            <p
              className='read-more'
              onClick={() => setFlag(!flag)}
              style={{
                color: 'var(--grey)',
                cursor: 'pointer',
                margin: "1rem 1rem",
                lineHeight: "1.6rem",
                fontSize: "1rem"
              }}
            >
              Read more...
            </p>
          </>
        ) : (
          <>
            <p className='coininfo-description' dangerouslySetInnerHTML={{ __html: longdesc }} />
            <p
              className='read-more'
              onClick={() => setFlag(!flag)}
              style={{
                color: 'var(--grey)',
                cursor: 'pointer',
                margin: "1rem 1rem",
                lineHeight: "1.6rem",
                fontSize: "1rem"
              }}
            >
              Read less...
            </p>
          </>
        )
      ) : (
        <p className='coininfo-description'>{description}</p>
      )}
    </div>
  );
};

export default CoinInfo;
