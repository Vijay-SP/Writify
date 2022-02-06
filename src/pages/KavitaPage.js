/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Blogs/Card';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { db } from '../firebase';

const KavitaPage = () => {
  const [kavitas, setKavitas] = useState([]);

  useEffect(() => {
    db.collection('Poems')
      .get()
      .then((snapshot) => {
        const kavitas = [];
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
            };
            kavitas.push(data);
          }
        });
        setKavitas(kavitas);
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
        <div className="container d-flex justify-content-center p-4">
          <h2 style={{ fontFamily: 'Dancing Script' }}>Kavitas</h2>
        </div>
        <div
          className="container d-flex flex-direction-row flex-wrap justify-content-center my-3"
          style={{ width: '100vw' }}
        >
          {kavitas.map(
            ({
              img,
              description,
              title,
              updated_on,
              id,
              authorName,
              isApproved,
            }) => {
              return (
                <Card
                  img={img}
                  content={description}
                  title={title}
                  date={updated_on}
                  url={`/kavitas/${id}`}
                  author={authorName}
                  isApproved={isApproved}
                />
              );
            }
          )}
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default KavitaPage;
