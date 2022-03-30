/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './about.css'
import { motion } from "framer-motion";
import Navbar from '../Navbar';
import Footer from '../Footer';

const about = () => {
  return (
    <>
      <Navbar />
      <motion.div

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div class="ct-pageWrapper" id="ct-js-wrapper">

          <section class="company-heading intro-type" id="parallax-one">
            <div class="container1">
              <div class="row product-title-info">
                <div class="col-md-12">
                  <h1>ABOUT US</h1>
                </div>
              </div>
            </div>
            <div class="parallax" id="parallax-cta"></div>
          </section>


          <section class="story-section company-sections ct-u-paddingBoth100 paddingBothHalf noTopMobilePadding" id="section">
            <div class="container1 text-center">
              <h2>WHAT DRIVES US</h2>
              <h3>ENTERTAINING, CLEAN, MEANINGFUL & HEART-TOUCHING CONTENT</h3>
              <div class="col-md-8 col-md-offset-2">
                <div class="red-border"></div>
                <p class="ct-u-size22 ct-u-fontWeight300 marginTop40">
                  Writify is found to give end user a trusted and verified
                  platform to add their own written content which can be a blog ,
                  shayari,  kavita, quote, joke, etc. Also the majority content of
                  Writify will be originally delivered by themselves.
                  The main motive of the WRITERS-WORLD is to provide clean and beautiful
                  content to the reader. The WRITERS-WORLD assuers the transparency of the
                  content on the website as double admin verfication is to be done before
                  the content is put on the website.

                </p>
              </div>
            </div>
          </section>
          <section class="culture-section company-sections ct-u-paddingBoth100 paddingBothHalf noTopMobilePadding">
            <div class="container1">
              <div class="row">
                <div class="col-md-8 col-md-offset-2">
                  <h2>Our Contents</h2>
                  <h3>Enhance the entertainment and freshness of content for users</h3>
                  <p className="ct-u-size22 ct-u-fontWeight300 ct-u-marginBottom60">
                    Our main motive is to connect the reader emotionally, Understand his/her
                    feelings and let them relate with us. Our Shayaris are really heart-touching
                    and our quotes are much more motivational as they are from personal experience
                    Check the content to get more idea
                  </p>
                </div>
              </div>
              <div class="row ct-u-paddingBoth20">
                <div class="col-xs-6 col-md-4">
                  <div class="company-icons-white">
                    <i class="fas fa-pen-alt fa" aria-hidden="true"></i>
                    <p>Blogs</p>
                    <p className="company-icons-subtext hidden-xs">Entertainig and Educational Blogs.</p>
                  </div>
                </div>
                <div class="col-xs-6 col-md-4">
                  <div class="company-icons-white">
                    <i class="fas fa-highlighter fa" arial-hidden="true"></i>
                    <p>Kavitas</p>
                    <p className="company-icons-subtext hidden-xs">Deep and Meaningful Kavitas.</p>
                  </div>
                </div>
                <div class="col-xs-6 col-md-4">
                  <div class="company-icons-white">
                    <i class="fa fas fa-feather-alt" aria-hidden="true"></i>
                    <p>Shayaris</p>
                    <p className="company-icons-subtext hidden-xs"> Heart-Touching Shayaris.</p>
                  </div>
                </div>
              </div>
              <div class="row ct-u-paddingBoth20">
                <div class="col-xs-6 col-md-4">
                  <div class="company-icons-white">
                    <i class="fa fas fa-pen-fancy" aria-hidden="true"></i>
                    <p>Quotes</p>
                    <p className="company-icons-subtext hidden-xs">Own Motivational Quotes.</p>
                  </div>
                </div>
                <div class="col-xs-6 col-md-4">
                  <div class="company-icons-white">
                    <i class="fa fas fa-pencil-alt" aria-hidden="true"></i>
                    <p>Jokes</p>
                    <p class="company-icons-subtext hidden-xs">Laugh Cracking Jokes.</p>
                  </div>
                </div>
                <div class="col-xs-6 col-md-4">
                  <div class="company-icons-white">
                    <i class="fa fas fa-user-edit" aria-hidden="true"></i>
                    <p>User Content</p>
                    <p className="company-icons-subtext hidden-xs">Clean and verified user content with credits.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section class="customers-section company-sections ct-u-paddingBoth100 paddingBothHalf noTopMobilePadding">
            <div className="container1">
              <div class="row">
                <div class="col-md-8 col-md-offset-2">
                  <h2>ABOUT OUR USERS</h2>
                  <h3>Trusted , Verified and Geniune users from all over the world.</h3>
                  <p class="ct-u-size22 ct-u-fontWeight300 ct-u-marginBottom60 marginTop40">
                    In Todays world many websites steal the content from the users and display as
                    their own content which is totally wrong and illegal too. Addressing this issues
                    Writify is bringing an end-user platoform where he/she can post his/her
                    blog, shayari, kavita, quote, joke, etc. and will credits too. Also to
                    maintain the content clean and transparent only after two factor admin
                    verification content will be displayed on the website. The user can
                    keep track of comments and likes on his/her posts. So without wasting any
                    time lets start writing together..
                  </p>
                </div>
                <div class="clearfix">
                </div>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
      <Footer />
    </>
  )
}

export default about
