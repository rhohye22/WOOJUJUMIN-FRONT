import { useRef, useState, useEffect } from "react";

function Footer() {
  const footerRef = useRef(null);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowFooter(true);
        } else {
          setShowFooter(false);
        }
      });
    }, options);

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} style={{ display: showFooter ? "block" : "none" }}>
      {/* 푸터 내용 */}
    </footer>
  );
}
export default Footer;
