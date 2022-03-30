/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { useHistory } from 'react-router';
import Card from '../components/Blogs/Card';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './UserProfile.css';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'react-bootstrap-icons';
import Footer from '../components/Footer';
import { Line } from 'rc-progress';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [showShayriForm, setShowShayriForm] = useState(false);
  const [showKavitaForm, setShowKavitaForm] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [userShayris, setUserShayris] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [userKavitas, setUserKavitas] = useState([]);
  const [userQuotes, setUserQuotes] = useState([]);
  const [showProgress, setShowProgress] = useState(false);
  const [done, setDone] = useState(0);
  const history = useHistory();

  const shayriTitle = useRef();
  const [shayriContent, setShayriContent] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const shayriSocialLink = useRef();
  const kavitaTitle = useRef();
  const [kavitaContent, setKavitaContent] = useState('');
  const kavitaSocialLink = useRef();
  const [quoteContent, setQuoteContent] = useState('');
  const [blogImg, setBlogImg] = useState();
  const blogTitle = useRef();
  const blogCategories = useRef();
  const blogSocialLink = useRef();

  useEffect(() => {
    if (currentUser && currentUser.userId) {
      db.collection('Shayris')
        .get()
        .then((snapshot) => {
          const usershayris = [];
          snapshot.forEach((doc) => {
            if (doc.data().userId === currentUser.userId) {
              const data = {
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                authorName: doc.data().authorName,
                isFeatured: doc.data().isFeatured,
                isApproved: doc.data().isApproved,
                updated_on: doc.data().updated_on,
                userId: doc.data().userId,
              };
              usershayris.push(data);
            }
          });
          setUserShayris(usershayris);
          console.log(usershayris);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.userId) {
      db.collection('Blogs')
        .get()
        .then((snapshot) => {
          const logs = [];
          snapshot.forEach((doc) => {
            if (doc.data().userId === currentUser.userId) {
              const data = {
                id: doc.id,
                title: doc.data().title,
                image: doc.data().images[0],
                categories: doc.data().categories,
                description: doc.data().description,
                authorName: doc.data().authorName,
                isFeatured: doc.data().isFeatured,
                isApproved: doc.data().isApproved,
                updated_on: doc.data().updated_on,
              };
              logs.push(data);
            }
          });
          setUserBlogs(logs);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.userId) {
      db.collection('Poems')
        .get()
        .then((snapshot) => {
          const kavitas = [];
          snapshot.forEach((doc) => {
            if (doc.data().userId === currentUser.userId) {
              const data = {
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                authorName: doc.data().authorName,
                isFeatured: doc.data().isFeatured,
                isApproved: doc.data().isApproved,
                updated_on: doc.data().updated_on,
              };
              kavitas.push(data);
            }
          });
          setUserKavitas(kavitas);
        });
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.userId) {
      db.collection('Quotes')
        .get()
        .then((snapshot) => {
          const quotes = [];
          snapshot.forEach((doc) => {
            if (doc.data().userId === currentUser.userId) {
              const data = {
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                authorName: doc.data().authorName,
                isFeatured: doc.data().isFeatured,
                isApproved: doc.data().isApproved,
                updated_on: doc.data().updated_on,
              };
              quotes.push(data);
            }
          });
          setUserQuotes(quotes);
        });
    }
  }, [currentUser]);

  const addShayri = async (e) => {
    setShowProgress(true);
    setDone(55);
    e.preventDefault();
    try {
      const data = {
        authorName: currentUser.username,
        isFeatured: false,
        isApproved: false,
        title: shayriTitle.current.value,
        description: shayriContent,
        rating: [{ 0: 0 }, { 0: 0 }, { 0: 0 }, { 0: 0 }, { 0: 0 }],
        updated_on: new Date().toString(),
        social_link: shayriSocialLink.current.value,
        userId: currentUser.userId,
      };
      await db.collection('Shayris').add(data);
      console.log(data);
      setDone(100);
      setUserShayris([data, ...userShayris]);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        setShowProgress(false);
        setDone(0);
      }, 3000);
    } catch (error) {
      console.log(error);
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  const addKavita = async (e) => {
    e.preventDefault();
    setShowProgress(true);
    setDone(55);
    try {
      const data = {
        authorName: currentUser.username,
        isFeatured: false,
        isApproved: false,
        title: kavitaTitle.current.value,
        description: kavitaContent,
        rating: [{ 0: 0 }, { 0: 0 }, { 0: 0 }, { 0: 0 }, { 0: 0 }],
        updated_on: new Date().toString(),
        social_link: kavitaSocialLink.current.value,
        userId: currentUser.userId,
      };
      await db.collection('Poems').add(data);
      setDone(100);
      setUserKavitas([data, ...userKavitas]);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        setShowProgress(false);
        setDone(0);
      }, 3000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };
  const addQuote = async (e) => {
    e.preventDefault();
    setShowProgress(true);
    setDone(55);
    try {
      const data = {
        authorName: currentUser.username,
        isFeatured: false,
        isApproved: false,
        description: quoteContent,
        updated_on: new Date().toString(),
        userId: currentUser.userId,
      };
      await db.collection('Quotes').add(data);
      setDone(100);
      setUserQuotes([data, ...userQuotes]);
      setSuccess(true);
      setError(false);
      setTimeout(() => {
        setSuccess(false);
        setShowProgress(false);
        setDone(0);
      }, 3000);
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const addBlog = async (e) => {
    e.preventDefault();
    setShowProgress(true);
    setDone(55);
    try {
      if (!blogImg) {
        await db.collection('Blogs').add({
          authorName: currentUser.username,
          isFeatured: false,
          isApproved: false,
          title: blogTitle.current.value,
          description: blogContent,
          categories: blogCategories.current.value.split(','),
          social_link: blogSocialLink.current.value,
          rating: [{ 0: 0 }, { 0: 0 }, { 0: 0 }, { 0: 0 }, { 0: 0 }],
          updated_on: new Date().toString(),
          userId: currentUser.userId,
        });
        setDone(100);
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          setSuccess(false);
          setShowProgress(false);
          setDone(0);
        }, 3000);
      } else {
        const data = new FormData();
        data.append('file', blogImg);
        data.append('upload_preset', 'blog_img_store');
        data.append('cloud_name', 'writers-hub');
        await fetch(
          'https://api.cloudinary.com/v1_1/writers-hub/image/upload',
          {
            method: 'post',
            body: data,
          }
        )
          .then((res) => res.json())
          .then((data) => {
            db.collection('Blogs').add({
              authorName: currentUser.username,
              isFeatured: false,
              isApproved: false,
              title: blogTitle.current.value,
              description: blogContent,
              categories: blogCategories.current.value.split(','),
              social_link: blogSocialLink.current.value,
              images: [data.url],
              rating: [{ 0: 0 }, { 0: 0 }, { 0: 0 }, { 0: 0 }, { 0: 0 }],
              updated_on: new Date().toString(),
              userId: currentUser.userId,
            });
          });
        setDone(100);
        setSuccess(true);
        setError(false);
        setTimeout(() => {
          setSuccess(false);
          setShowProgress(false);
          setDone(0);
        }, 3000);
      }
    } catch (error) {
      setError(true);
      setSuccess(false);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const removeShayri = (id) => {
    setUserShayris(userShayris.filter((shayri) => shayri.id !== id));
  };

  const removeBlog = (id) => {
    setUserBlogs(userBlogs.filter((blog) => blog.id !== id));
  };

  const removeKavita = (id) => {
    setUserKavitas(userKavitas.filter((kavita) => kavita.id !== id));
  };

  const removeQuote = (id) => {
    setUserQuotes(userQuotes.filter((quote) => quote.id !== id));
  };

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Navbar />
      <div className="container">
        <div>
          {currentUser && currentUser.username && currentUser.email && (
            <div className="ms-3">
              <div className="container d-flex justify-content-center align-items-center">
                <div className="card mt-5" style={{ width: '800px' }}>
                  <div className="user text-center text-dark">
                    <div>
                      {' '}
                      <Avatar name={currentUser.username} round="50px" />
                    </div>
                  </div>
                  <div className="mt-5 text-center">
                    <h4
                      className="mb-0 text-dark"
                      style={{ fontSize: '32px', fontFamily: 'Dancing Script' }}
                    >
                      {currentUser.username}
                    </h4>{' '}
                    <span
                      className="text-muted d-block mb-2"
                      style={{ fontSize: '22px' }}
                    >
                      {currentUser.email}
                    </span>{' '}
                    <br />
                    <Link to={`/edituser/${currentUser.userId}`} className='text-decoration-none'> Edit Profile </Link><br />
                    <Link to={`/user/${currentUser.userId}`} className='text-decoration-none'> View Profile </Link>
                    <div className="container d-flex  justify-content-center mt-4 px-4">
                      <div className="stats">
                        <h6
                          class="mb-0 text-dark"
                          style={{
                            fontSize: '28px',
                            fontFamily: 'Dancing Script',
                          }}
                        >
                          Blogs
                          <div>
                            <PlusCircle
                              fontSize={20}
                              color="green"
                              onClick={() => {
                                if (showBlogForm) {
                                  setShowBlogForm(false);
                                } else {
                                  setShowBlogForm(true);
                                  setShowShayriForm(false);
                                  setShowKavitaForm(false);
                                  setShowQuoteForm(false);
                                }
                              }}
                            />
                          </div>
                        </h6>{' '}
                        <span className="fs-5">{userBlogs.length}</span>
                      </div>
                      <div class="stats" style={{ marginLeft: '22px' }}>
                        <h6
                          className="mb-0 text-dark"
                          style={{
                            fontSize: '28px',
                            fontFamily: 'Dancing Script',
                          }}
                        >
                          Kavitas
                          <div>
                            <PlusCircle
                              fontSize={20}
                              color="green"
                              onClick={() => {
                                if (showKavitaForm) {
                                  setShowKavitaForm(false);
                                } else {
                                  setShowKavitaForm(true);
                                  setShowBlogForm(false);
                                  setShowShayriForm(false);
                                  setShowQuoteForm(false);
                                }
                              }}
                            />
                          </div>
                        </h6>{' '}
                        <span>{userKavitas.length}</span>
                      </div>
                      <div class="stats" style={{ marginLeft: '22px' }}>
                        <h6
                          className="mb-0 text-dark"
                          style={{
                            fontSize: '28px',
                            fontFamily: 'Dancing Script',
                          }}
                        >
                          Shayris
                          <div>
                            <PlusCircle
                              fontSize={20}
                              color="green"
                              onClick={() => {
                                if (showShayriForm) {
                                  setShowShayriForm(false);
                                } else {
                                  setShowShayriForm(true);
                                  setShowBlogForm(false);
                                  setShowKavitaForm(false);
                                  setShowQuoteForm(false);
                                }
                              }}
                            />
                          </div>
                        </h6>{' '}
                        <span>{userShayris.length}</span>
                      </div>
                      <div
                        class="stats text-dark"
                        style={{ marginLeft: '22px' }}
                      >
                        <h6
                          class="mb-0"
                          style={{
                            fontSize: '28px',
                            fontFamily: 'Dancing Script',
                          }}
                        >
                          Quotes
                          <div>
                            <PlusCircle
                              fontSize={20}
                              color="green"
                              onClick={() => {
                                if (showQuoteForm) {
                                  setShowQuoteForm(false);
                                } else {
                                  setShowQuoteForm(true);
                                  setShowBlogForm(false);
                                  setShowShayriForm(false);
                                  setShowKavitaForm(false);
                                }
                              }}
                            />
                          </div>
                        </h6>{' '}
                        <span>{userQuotes.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <br />
              <br />
              <div className="container d-flex flex-column justify-content-center">
                {currentUser.isAdmin && (
                  <>
                    <button
                      className="btn btn-primary ms-3 mt-2"
                      onClick={() => {
                        history.push('/approvals');
                      }}
                    >
                      Approved / Featured
                    </button>
                    <br />
                    <button
                      className="btn btn-primary ms-3 mt-2"
                      onClick={() => {
                        history.push('/reports');
                      }}
                    >
                      Reported Content
                    </button>
                  </>

                )}

                {/* <button
                  className="btn btn-success ms-3 mt-2"
                  onClick={() => {
                    if (showBlogForm) {
                      setShowBlogForm(false);
                    } else {
                      setShowBlogForm(true);
                      setShowShayriForm(false);
                      setShowKavitaForm(false);
                      setShowQuoteForm(false);
                    }
                  }}
                >
                  Add Blog
                </button>

                <button
                  className="btn btn-success ms-3 mt-2"
                  onClick={() => {
                    if (showShayriForm) {
                      setShowShayriForm(false);
                    } else {
                      setShowShayriForm(true);
                      setShowBlogForm(false);
                      setShowKavitaForm(false);
                      setShowQuoteForm(false);
                    }
                  }}
                >
                  Add shayri
                </button>
                <button
                  className="btn btn-success ms-3 mt-2"
                  onClick={() => {
                    if (showKavitaForm) {
                      setShowKavitaForm(false);
                    } else {
                      setShowKavitaForm(true);
                      setShowBlogForm(false);
                      setShowShayriForm(false);
                      setShowQuoteForm(false);
                    }
                  }}
                >
                  Add kavita
                </button>
                <button
                  className="btn btn-success ms-3 mt-2"
                  onClick={() => {
                    if (showQuoteForm) {
                      setShowQuoteForm(false);
                    } else {
                      setShowQuoteForm(true);
                      setShowBlogForm(false);
                      setShowShayriForm(false);
                      setShowKavitaForm(false);
                    }
                  }}
                >
                  Add Quote
                </button> */}
              </div>
              <div>
                {showBlogForm && (
                  <form onSubmit={addBlog}>
                    {success && (
                      <div class="alert alert-success" role="alert">
                        Success! , your shayri will be posted once the admin
                        approves it
                      </div>
                    )}
                    {error && (
                      <div class="alert alert-error" role="alert">
                        opps something went wrong!
                      </div>
                    )}
                    {showProgress && (
                      <div className="d-flex">
                        <Line
                          percent={done}
                          strokeWidth="2"
                          strokeColor="green"
                        />
                        <span>{done}%</span>
                      </div>
                    )}
                    <div>
                      <label for="exampleInputEmail1">image:</label>
                      <input
                        className="p-3"
                        type="file"
                        onChange={(e) => setBlogImg(e.target.files[0])}
                      />{' '}
                      {blogImg && (
                        <img
                          style={{ height: '120px' }}
                          src={URL.createObjectURL(blogImg)}
                          alt="error"
                        />
                      )}
                    </div>
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="title"
                        ref={blogTitle}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="categories"
                        ref={blogCategories}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="social media links"
                        ref={blogSocialLink}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <ReactQuill
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="blog"
                        style={{ height: '207px' }}
                        value={blogContent}
                        onChange={(value) => setBlogContent(value)}
                      />
                    </div>

                    <button
                      type="submit"
                      class="btn btn-secondary mt-5"
                      style={{ fontFamily: 'Dancing Script' }}
                    >
                      Submit
                    </button>
                  </form>
                )}
                {showShayriForm && (
                  <form onSubmit={addShayri}>
                    {success && (
                      <div class="alert alert-success" role="alert">
                        Success! , your shayri will be posted once the admin
                        approves it
                      </div>
                    )}
                    {error && (
                      <div class="alert alert-error" role="alert">
                        opps something went wrong!
                      </div>
                    )}
                    {showProgress && (
                      <div className="d-flex">
                        <Line
                          percent={done}
                          strokeWidth="2"
                          strokeColor="green"
                        />
                        <span>{done}%</span>
                      </div>
                    )}
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="title"
                        ref={shayriTitle}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="social media link"
                        onChange={(e) => console.log(e.target.value)}
                        ref={shayriSocialLink}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <ReactQuill
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="shayri"
                        style={{ height: '207px', fontSize: '22px' }}
                        value={shayriContent}
                        onChange={(value) => setShayriContent(value)}
                      />
                    </div>
                    <br />
                    <button
                      type="submit"
                      class="btn btn-secondary mt-5 "
                      style={{ fontFamily: 'Dancing Script' }}
                    >
                      Submit
                    </button>
                  </form>
                )}
                {showKavitaForm && (
                  <form onSubmit={addKavita}>
                    {success && (
                      <div class="alert alert-success" role="alert">
                        Success! , your kavita will be posted once the admin
                        approves it
                      </div>
                    )}
                    {error && (
                      <div class="alert alert-error" role="alert">
                        opps something went wrong!
                      </div>
                    )}
                    {showProgress && (
                      <div className="d-flex">
                        <Line
                          percent={done}
                          strokeWidth="2"
                          strokeColor="green"
                        />
                        <span>{done}%</span>
                      </div>
                    )}
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="title"
                        ref={kavitaTitle}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <input
                        type="text"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="social media link"
                        ref={kavitaSocialLink}
                        style={{
                          borderStyle: 'none',
                          borderRadius: '0px',
                          borderBottom: '1px solid grey',
                        }}
                      />
                    </div>
                    <div class="form-group">
                      <br />
                      <ReactQuill
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="kavita"
                        style={{ height: '207px' }}
                        value={kavitaContent}
                        onChange={(value) => setKavitaContent(value)}
                      />
                    </div>

                    <button
                      type="submit"
                      class="btn btn-secondary mt-5"
                      style={{ fontFamily: 'Dancing Script' }}
                    >
                      Submit
                    </button>
                  </form>
                )}
                {showQuoteForm && (
                  <form onSubmit={addQuote}>
                    {success && (
                      <div class="alert alert-success" role="alert">
                        Success! , your quote will be posted once the admin
                        approves it
                      </div>
                    )}
                    {error && (
                      <div class="alert alert-error" role="alert">
                        Opps something went wrong!
                      </div>
                    )}
                    {showProgress && (
                      <div className="d-flex">
                        <Line
                          percent={done}
                          strokeWidth="2"
                          strokeColor="green"
                        />
                        <span>{done}%</span>
                      </div>
                    )}
                    <label htmlFor="">Quote Content</label>
                    <div class="form-group">
                      <ReactQuill
                        type="text"
                        class="form-control"
                        id="exampleInputPassword1"
                        placeholder="Quote"
                        style={{ height: '207px' }}
                        value={quoteContent}
                        onChange={(value) => setQuoteContent(value)}
                      />
                    </div>

                    <button
                      type="submit"
                      class="btn btn-secondary mt-5"
                      style={{ fontFamily: 'Dancing Script' }}
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="pt-5">
          <div className="container d-flex justify-content-center p-4">
            <h2 style={{ fontFamily: 'Dancing Script' }}>My Shayaris</h2>
          </div>
          <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-3">
            {userShayris.length > 0 ? (
              userShayris.map(
                ({
                  img,
                  id,
                  description,
                  title,
                  authorName,
                  isFeatured,
                  isApproved,
                  updated_on,
                }) => {
                  return (
                    <Card
                      img={img}
                      content={description}
                      title={title}
                      date={updated_on}
                      url={`/shayaris/${id}`}
                      author={authorName}
                      deleteOption={true}
                      isApproved={isApproved}
                      isFeatured={isFeatured}
                      collection={'Shayris'}
                      id={id}
                      removeData={(id) => removeShayri(id)}
                    />
                  );
                }
              )
            ) : (
              <div className="d-flex justify-content-center">No posts yet</div>
            )}
          </div>
        </div>
        <div className="pt-5">
          <div className="container d-flex justify-content-center p-4">
            <h2 style={{ fontFamily: 'Dancing Script' }}>My Blogs</h2>
          </div>
          <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-3">
            {userBlogs.length > 0 ? (
              userBlogs.map(
                ({ id, image, description, title, authorName, isApproved, isFeatured, updated_on }) => {
                  return (
                    <Card
                      img={image}
                      content={description}
                      title={title}
                      author={authorName}
                      date={updated_on}
                      isApproved={isApproved}
                      isFeatured={isFeatured}
                      url={`/blogs/${id}`}
                      deleteOption={true}
                      collection={'Blogs'}
                      id={id}
                      removeData={(id) => removeBlog(id)}
                    />
                  );
                }
              )
            ) : (
              <div className="d-flex justify-content-center">No posts yet</div>
            )}
          </div>
        </div>
        <div className="pt-5">
          <div className="container d-flex justify-content-center p-4">
            <h2 style={{ fontFamily: 'Dancing Script' }}>My Kavitas</h2>
          </div>
          <div className=" d-flex flex-direction-row flex-wrap justify-content-center my-3">
            {userKavitas.length > 0 ? (
              userKavitas.map(
                ({ img, description, title, updated_on, id, isApproved, isFeatured, authorName }) => {
                  return (
                    <Card
                      img={img}
                      content={description}
                      title={title}
                      date={updated_on}
                      isApproved={isApproved}
                      isFeatured={isFeatured}
                      url={`/kavitas/${id}`}
                      author={authorName}
                      deleteOption={true}
                      collection={'Poems'}
                      id={id}
                      removeData={(id) => removeKavita(id)}
                    />
                  );
                }
              )
            ) : (
              <div className="d-flex justify-content-center">No posts yet</div>
            )}
          </div>
        </div>
        <div className="pt-5">
          <div className="container d-flex justify-content-center p-4">
            <h2 style={{ fontFamily: 'Dancing Script' }}>My Quotes</h2>
          </div>
          <div className="container d-flex flex-direction-row flex-wrap justify-content-center my-3">
            {userQuotes.length > 0 ? (
              userQuotes.map(
                ({
                  img,
                  description,
                  title,
                  updated_on,
                  id,
                  authorName,
                  isApproved,
                  isFeatured,
                }) => {
                  return (
                    <Card
                      img={img}
                      id={id}
                      content={description}
                      title={title}
                      date={updated_on}
                      url={`/quotes/${id}`}
                      author={authorName}
                      isApproved={isApproved}
                      isFeatured={isFeatured}
                      deleteOption={true}
                      collection={'Quotes'}
                      removeData={(id) => removeQuote(id)}
                    />
                  );
                }
              )
            ) : (
              <div className="d-flex justify-content-center pb-5">
                No posts yet
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
