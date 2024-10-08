import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import './home.css';

const Home = ({ scrollToContact }) => {
  const counterRefs = Array.from({ length: 4 }, () => useRef(null));
  const contactRef = useRef(null);

  useEffect(() => {
    const animateCounter = (counterRef, duration, toValue, fromValue) => {
      const counterElement = counterRef.current;
      const startTime = performance.now();

      const animationFrame = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentValue = Math.floor(fromValue + (toValue - fromValue) * progress);
        counterElement.textContent = currentValue.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(animationFrame);
        }
      };

      requestAnimationFrame(animationFrame);
    };

    animateCounter(counterRefs[0], 2000, 5, 0);
    animateCounter(counterRefs[1], 2000, 9, 0);
    animateCounter(counterRefs[2], 2000, 10, 0);
    animateCounter(counterRefs[3], 2000, 20, 0);

    if (scrollToContact) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [scrollToContact]);

  return (
    <>
      <div className="home-container">
        <h1>אחיות בע"מ</h1>
        <h5>ביחד נעזור לעם</h5>
        <h2>כמות קטנה של הזמן שלך יכול לשנות את העולם</h2>
        <p>
          בתוך החיים העמוסים שכולנו שקועים בו, יש הרבה מאוד קושי לחלק מהעם.
          מיזם "אחיות בע"מ" – מסיע למשפחות שצריכות סיוע כלשהו.
          אחיות בע"מ נוסדה כדי להוות קורת גג בטוחה ומסודרת לנשים חרדיות שמעוניינות להושיט יד ולשאת בעול עם אחיותיהן שהן ומשפחותיהן זקוקות לסיוע בשל מצב כלשהו.
          מעבר לסיוע הפרקטי, רוח האחדות והאחווה מקרבת לבבות ומחזקת את החוסן האישי והקהילתי.
        </p>
        <div className="stats-grid">
          {counterRefs.map((counterRef, index) => {
            let text = '';
            switch (index % 4) {
              case 0:
                text = 'מתנדבות';
                break;
              case 1:
                text = 'משחקים';
                break;
              case 2:
                text = 'ארוחות';
                break;
              case 3:
                text = 'שעות התנדבות';
                break;
              default:
                break;
            }
            return (
              <div className="stats-item" key={index}>
                <span className="large-bold-span" ref={counterRef} data-duration="2000" data-to-value="1500" data-from-value="0" data-delimiter=",">+0</span>
                <div className="large-bold-div">{text}</div>
              </div>
            );
          })}
        </div>
        <div id="contact" className="contact-section" ref={contactRef}>
          <h2>:)צור קשר - בואי נדבר</h2>
          <p>:לכל בקשה או שאלה ניתן לפנות למייל זה</p>
          <a href="mailto:achaiotbaam@gmail.com">achaiotbaam@gmail.com</a>
          <p>ונשמח לענות לך בהקדם האפשרי</p>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Home;
