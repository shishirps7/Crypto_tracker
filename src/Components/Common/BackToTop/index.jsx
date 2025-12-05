import React, { useEffect } from 'react'
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import "./styles.css"

const BackToTop = () => {

  useEffect(() => {
    const mybutton = document.getElementById("myBtn");

    const scrollFunction = () => {
      if (window.scrollY > 80) {
        mybutton.style.display = "flex";
      } else {
        mybutton.style.display = "none";
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => window.removeEventListener("scroll", scrollFunction);
  }, []);

  const topFunction = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className='back-to-top-btn' id='myBtn' onClick={topFunction}>
      <ArrowUpwardRoundedIcon style={{color:"var(--blue)"}}/>
    </div>
  );
}

export default BackToTop;
