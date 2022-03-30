/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { data } from 'browserslist';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { db } from '../firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
} from 'react-share';
import { useAuth } from '../context/AuthContext';
import { HandThumbsDownFill, HandThumbsUpFill } from 'react-bootstrap-icons';


const Shayri = () => {
  const { id } = useParams();

  const [shayri, setShayri] = useState();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [tlikes, setTlikes] = useState([]);
  const [reposuccess, setrepoSuccess] = useState(false);
  const [repoerror, setrepoError] = useState(false);
  const [reason, setReason] = useState('');
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const single = db.collection('Shayris').doc(id);

    single
      .get()
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data();
          setShayri(data);
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
    db.collection('Shayris')
      .doc(id)
      .collection('comment')
      .get()
      .then((snapshot) => {
        const comm = [];
        snapshot.forEach((doc) => {
          comm.push({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            comment: doc.data().comment,
            created_at: doc.data().created_at,
          });
        });
        setComments(comm);
      });
    console.log(comments);
  }, []);

  useState(() => {
    db.collection('Shayris')
      .doc(id)
      .collection('like')
      .get()
      .then((snapshot) => {
        const dat = [];
        snapshot.forEach((doc) => {
          dat.push(doc.data());
        });
        setTlikes(dat);
      });
  }, []);

  const addComment = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      history.push('/login');
      setSuccess(false);
      setError(true);
    } else {
      const commentData = {
        userId: currentUser.id,
        name: currentUser.username,
        email: currentUser.email,
        comment: comment,
        created_at: new Date().toString(),
      };
      try {
        await db.collection('Shayris').doc(id).collection('comment').add({
          name: currentUser.username,
          email: currentUser.email,
          comment: comment,
          created_at: new Date().toString(),
        });
        setError(false);
        setSuccess(true);
        setComments([commentData, ...comments]);
      } catch (error) {
        setSuccess(false);
        setError(true);
      }
    }
  };

  const reportBlog = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      history.push('/login');
      setrepoSuccess(false);
      setrepoError(true);
    } else {
      try {
        await db.collection('Reports').doc().set({
          name: currentUser.username,
          email: currentUser.email,
          reason: reason,
          userId:currentUser.id,
          url: `/shayaris/${id}`,
          created_at: new Date().toString(),
        });
        setrepoError(false);
        setrepoSuccess(true);
      } catch (error) {
        setrepoSuccess(false);
        setrepoError(true);
      }
    }
  };

  const AddLike = async (e) => {
    if (!currentUser) {
      history.push('/login');
    } else {
      await db.collection('Shayris').doc(`/${id}/like/${currentUser.id}`).set({
        like: 1,
      });
      db.collection('Shayris')
        .doc(id)
        .collection('like')
        .get()
        .then((snapshot) => {
          const dat = [];
          snapshot.forEach((doc) => {
            dat.push(doc.data());
          });
          setTlikes(dat);
        });
    }
  };

  console.log(comments);

  const Unlike = async (e) => {
    if (!currentUser) {
      history.push('/login');
    } else {
      await db
        .collection('Shayris')
        .doc(`/${id}/like/${currentUser.id}`)
        .delete();
      db.collection('Shayris')
        .doc(id)
        .collection('like')
        .get()
        .then((snapshot) => {
          const dat = [];
          snapshot.forEach((doc) => {
            dat.push(doc.data());
          });
          setTlikes(dat);
        });
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Navbar />
      {shayri ? (
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-8">
              <article>
                <header className="mb-4">
                  <h1 className="fw-bolder mb-1">{shayri.title}</h1>

                  <div className="text-muted fst-italic mb-2">
                    Posted on {shayri.updated_on}, 2021 <br /> by{' '}
                    {shayri.authorName}
                  </div>
                  <div>
                    <button className="btn btn-light" onClick={AddLike}>
                      <HandThumbsUpFill />
                    </button>

                    {tlikes && (
                      <span class="badge rounded-pill bg-secondary">
                        {tlikes.length}
                      </span>
                    )}
                    <button className="btn btn-light" onClick={Unlike}>
                      <HandThumbsDownFill />
                    </button>
                  </div>
                </header>
                <section
                  className="mb-5 "
                  style={{ textAlign: 'justify', width: '300px' }}
                >
                  <p className="fs-5 mb-4">
                    <div
                      dangerouslySetInnerHTML={{ __html: shayri.description }}
                    />
                  </p>
                </section>
                <div className="mb-5" style={{ border: '0' }}>
                  <div className="comments  py-4">
                    <p
                      className="author ps-3 ms-3 "
                      style={{
                        position: 'relative',
                        fontWeight: 'bold',
                        fontSize: '18px',
                        fontFamily: 'sans-serif',
                        color: '#222',
                      }}
                    >
                      TOP COMMENTS
                    </p>

                    <div className="d-flex flex-row flex-wrap">
                      {/* single comment 1 */}
                      {comments.map((comment) => (
                        <div className="col-lg-6 col-md-6 col-sm-12 pb-3">
                          <div className="d-flex flex-row single-post flex-wrap col-12">
                            <div className="px-3 col-lg-12 col-md-12 col-sm-12">
                              <div className="d-inline-flex justify-content-between">
                                <p className="popular-blog-comment pb-1 mb-0">
                                  <span
                                    style={{
                                      fontWeight: 'bold',
                                      fontFamily: 'sans-serif',
                                      fontSize: '1rem',
                                    }}
                                  >
                                    {comment.name}
                                  </span>
                                </p>
                              </div>
                              <p className=" pt-0 mt-0 pb-1 mb-0">
                                <span
                                  style={{
                                    fontWeight: 'bold',
                                    fontSize: '0.9rem',
                                  }}
                                >
                                  {comment.comment}
                                </span>
                              </p>
                              <div className="d-flex">
                                <p
                                  className="pt-0 mt-0 pe-2"
                                  style={{ fontSize: '0.85rem' }}
                                >
                                  {format(comment.created_at)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* end of comment 1 */}

                      {/* single comment 2 */}

                      {/* end of single comment */}
                      {/* single comment 2 */}

                      {/* end of single comment */}
                    </div>
                  </div>
                </div>
                )
              </article>
            </div>

            <div className="col-lg-4">
              {/* author details, adding dynamic images and social media links */}
              <div className="author-details d-flex flex-column border py-3">
                <p
                  className="author ps-3 ms-3 "
                  style={{
                    position: 'relative',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontFamily: 'sans-serif',
                    color: '#222',
                  }}
                >
                  AUTHOR WIDGETS
                </p>
                <figure className="mb-4 d-flex justify-content-center">
                  <img
                    className="img-fluid author-img"
                    src="https://images.unsplash.com/photo-1579293676244-953f569610cd?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGF1dGhvcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt="hello"
                    style={{
                      height: '300px',
                      width: '300px',
                    }}
                  />
                </figure>
                <div className="d-flex justify-content-center flex-column align-items-center pb-5">
                  <p><Link to={`/user/${shayri.userId}`}>{shayri.authorName}</Link></p>
                </div>
                <div className="py-4">
                  <p
                    className="author ps-3 ms-3"
                    style={{
                      position: 'relative',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      fontFamily: 'sans-serif',
                      color: '#222',
                    }}
                  >
                    SOCIAL SHARE
                  </p>
                  <ul className="d-flex" style={{ listStyle: 'none' }}>
                    <TwitterShareButton
                      url={window.location.href}
                      quote={shayri.title}
                    >
                      <TwitterIcon
                        logoFillColor="white"
                        size="53"
                        round={true}
                      ></TwitterIcon>
                    </TwitterShareButton>
                    <li className="px-1">
                      <FacebookShareButton
                        url={window.location.href}
                        quote={shayri.title}
                        hashtag="#Shayri"
                      >
                        <FacebookIcon
                          logoFillColor="white"
                          size="53"
                          round={true}
                        ></FacebookIcon>
                      </FacebookShareButton>
                    </li>
                    <li className="px-1">
                      <WhatsappShareButton
                        url={window.location.href}
                        quote={shayri.title}
                      >
                        <WhatsappIcon
                          logoFillColor="white"
                          size="53"
                          round={true}
                        ></WhatsappIcon>
                      </WhatsappShareButton>
                    </li>

                    <li className="px-1">
                      <TelegramShareButton
                        url={window.location.href}
                        quote={shayri.title}
                        hashtag="#shayri"
                      >
                        <TelegramIcon
                          logoFillColor="white"
                          size="53"
                          round={true}
                        ></TelegramIcon>
                      </TelegramShareButton>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="d-flex flex-column border py-3 my-3">
                <p
                  className="author ps-3 ms-3"
                  style={{
                    position: 'relative',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontFamily: 'sans-serif',
                    color: '#222',
                  }}
                >
                  MORE
                </p>
                <div className="card-body">
                  <div className="col-12">
                    <ul className="list-unstyled d-flex flex-wrap justify-content-start flex-row">
                      <li className="px-2">
                        <Link to="/blogs" style={{ textDecoration: 'none' }}>
                          <p className="button-author">Blogs</p>
                        </Link>
                      </li>
                      <li className="px-2">
                        <Link to="/shayaris" style={{ textDecoration: 'none' }}>
                          <p className="button-author">Shayaris</p>
                        </Link>
                      </li>

                      <li className="px-2">
                        <Link to="/kavitas" style={{ textDecoration: 'none' }}>
                          <p className="button-author">Kavitas</p>
                        </Link>
                      </li>
                      <li className="px-2">
                        <Link to="/quotes" style={{ textDecoration: 'none' }}>
                          <p className="button-author">Quotes</p>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column border py-3 my-3">
                <p
                  className="author ps-3 ms-3"
                  style={{
                    position: 'relative',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontFamily: 'sans-serif',
                    color: '#222',
                  }}
                >
                  LEAVE A COMMENT
                </p>
                {success && (
                  <span>
                    <div class="alert alert-success" role="alert">
                      Comment posted
                    </div>
                  </span>
                )}
                {error && (
                  <span>
                    <div class="alert alert-danger" role="alert">
                      oops something went wrong!
                    </div>
                  </span>
                )}
                <form
                  action="POST"
                  className="p-3"
                  style={{
                    color: '#222',
                    fontFamily: 'sans-serif',
                    fontWeight: '600',
                  }}
                  onSubmit={addComment}
                >
                  <div class="form-group py-3">
                    <label className="pb-1" for="exampleFormControlTextarea1">
                      Comment
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>

                  <p
                    className="button-author py-1"
                    style={{
                      width: '50%',
                    }}
                  >
                    <button
                      type="submit"
                      className="btn"
                      style={{ fontWeight: 'bold' }}
                    >
                      Post Comment
                    </button>
                  </p>
                </form>
              </div>

              <div className="d-flex flex-column border py-3 my-3">
                <p
                  className="author ps-3 ms-3"
                  style={{
                    position: 'relative',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    fontFamily: 'sans-serif',
                    color: '#222',
                  }}
                >
                  REPORT THE BLOG
                </p>
                {reposuccess && (
                  <span>
                    <div class="alert alert-success" role="alert">
                      Report posted
                    </div>
                  </span>
                )}
                {repoerror && (
                  <span>
                    <div class="alert alert-danger" role="alert">
                      oops something went wrong!
                    </div>
                  </span>
                )}
                <form
                  action="POST"
                  className="p-3"
                  style={{
                    color: '#222',
                    fontFamily: 'sans-serif',
                    fontWeight: '600',
                  }}
                  onSubmit={reportBlog}
                >
                  <div class="form-group py-3">
                    <label className="pb-1" for="exampleFormControlTextarea1">
                      Report Reason
                    </label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      required
                      onChange={(e) => setReason(e.target.value)}
                    ></textarea>
                  </div>

                  <p
                    className="button-author py-1"
                    style={{
                      width: '50%',
                    }}
                  >
                    <button
                      type="submit"
                      className="btn"
                      style={{ fontWeight: 'bold' }}
                    >
                      Report
                    </button>
                  </p>
                </form>
              </div>

            </div>
          </div>
          {console.log(window.location.href)}
        </div>
      ) : (
        <div class="text-center p-5">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Shayri;
