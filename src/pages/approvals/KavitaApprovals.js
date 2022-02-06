/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Navbar from '../../components/Navbar';
import { db } from '../../firebase';

const KavitaApprovals = () => {
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [kavita, setKavita] = useState();
  useEffect(() => {
    const single = db.collection('Poems').doc(id);

    single
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          setKavita(data);
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }, []);

  const handleApprove = async () => {
    try {
      await db.collection('Poems').doc(id).update({
        isApproved: true,
      });
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }
  };

  const handleNotApprove = async () => {
    try {
      await db.collection('Poems').doc(id).delete();
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Navbar />
      {kavita ? (
        <div className="container mt-5">
          <div>
            <article>
              {success && (
                <div class="alert alert-success" role="alert">
                  Success!
                </div>
              )}
              {error && (
                <div class="alert alert-danger" role="alert">
                  Opps something went wrong
                </div>
              )}
              <header className="mb-4">
                <h1 className="fw-bolder mb-1">{kavita.title}</h1>
                <button className="btn btn-success" onClick={handleApprove}>
                  Approve
                </button>
                <button
                  className="btn btn-danger ms-3"
                  onClick={handleNotApprove}
                >
                  Disapprove
                </button>
                <div className="text-muted fst-italic mb-2">
                  Posted on {kavita.updated_on}, 2021 <br /> by{' '}
                  {kavita.authorName}
                </div>
              </header>

              <section
                className="mb-5 "
                style={{ textAlign: 'justify', width: '300px' }}
              >
                <p className="fs-5 mb-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: kavita.description }}
                  />
                </p>
              </section>
            </article>
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </div>
  );
};

export default KavitaApprovals;
