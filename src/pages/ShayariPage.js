import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Blogs/Card';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import "./shayaripage.css"

const ShayariPage = () => {
  const [shayris, setShayris] = useState([]);

  useEffect(() => {
    db.collection('Shayris')
      .get()
      .then((snapshot) => {
        const shayris = [];
        snapshot.forEach((doc) => {
          if (doc.data().isApproved === true) {
            const data = {
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              authorName: doc.data().authorName,
              isFeatured: doc.data().isFeatured,
              updated_on: doc.data().updated_on,
              isApproved: doc.data().isApproved,
              userId: doc.data().userId,
            };

            shayris.push(data);
          }
        });
        setShayris(shayris);
        console.log(shayris);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div style={{ width: '100vw', backgroundColor: '#efefef' }}>
        <Navbar backButton={true} />
        <div className='container d-flex justify-content-center p-4'>
          <h2 style={{ fontFamily: 'Dancing Script' }}>Shayaris</h2>
        </div>
        <section id="shayari-bg" class="d-flex align-items-center">
        <div
          className='container d-flex flex-direction-row flex-wrap justify-content-center my-3'
          style={{ width: '100vw' }}
        >
          {shayris.map(
            ({
              img,
              id,
              description,
              title,
              authorName,
              isFeatured,
              updated_on,
              isApproved,
              userId
            }) => {
              return (
                <div>
                  <Card
                    img={img}
                    content={description}
                    title={title}
                    date={updated_on}
                    url={`/shayaris/${id}`}
                    author={authorName}
                    isApproved={isApproved}
                    isFeatured={isFeatured}
                    userId={userId}
                  />
                </div>
              );
            }
          )}
        </div>
        </section>
        <Footer />
      </div>
    </motion.div>
  );
};

export default ShayariPage;
