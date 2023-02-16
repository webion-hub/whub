import { Link } from '@mui/material';
import { Paragraph } from '@webion/ui-components';
import React from 'react';
import { WebionRepository } from '../../../lib/WebionRepositiory';

export default function CookiePolicy() {
  return (
    <Paragraph title="Cookie Policy">
      <h1>Cookie Policy for Webion</h1>
      <p>This is the Cookie Policy for Webion, accessible from webion.it</p>
      <p>
        <strong>What Are Cookies</strong>
      </p>
      <p>
        As is common practice with almost all professional websites this site
        uses cookies, which are tiny files that are downloaded to your computer,
        to improve your experience. This page describes what information they
        gather, how we use it and why we sometimes need to store these cookies.
        We will also share how you can prevent these cookies from being stored
        however this may downgrade or &apos;break&apos; certain elements of the
        sites functionality.
      </p>
      <p>
        <strong>How We Use Cookies</strong>
      </p>
      <p>
        We use cookies for a variety of reasons detailed below. Unfortunately in
        most cases there are no industry standard options for disabling cookies
        without completely disabling the functionality and features they add to
        this site. It is recommended that you leave on all cookies if you are
        not sure whether you need them or not in case they are used to provide a
        service that you use.
      </p>
      <p>
        <strong>Disabling Cookies</strong>
      </p>
      <p>
        You can prevent the setting of cookies by adjusting the settings on your
        browser (see your browser Help for how to do this). Be aware that
        disabling cookies will affect the functionality of this and many other
        websites that you visit. Disabling cookies will usually result in also
        disabling certain functionality and features of the this site. Therefore
        it is recommended that you do not disable cookies. This Cookies Policy
        was created with the help of the{' '}
        <Link
          color="inherit"
          href="https://www.cookiepolicygenerator.com/cookie-policy-generator/"
        >
          Cookies Policy Generator from CookiePolicyGenerator.com
        </Link>
        .
      </p>
      <p>
        <strong>The Cookies We Set</strong>
      </p>
      <ul>
        <li>
          <p>Email newsletters related cookies</p>
          <p>
            This site offers newsletter or email subscription services and
            cookies may be used to remember if you are already registered and
            whether to show certain notifications which might only be valid to
            subscribed/unsubscribed users.
          </p>
        </li>
        <li>
          <p>Forms related cookies</p>
          <p>
            When you submit data to through a form such as those found on
            contact pages or comment forms cookies may be set to remember your
            user details for future correspondence.
          </p>
        </li>
        <li>
          <p>Site preferences cookies</p>
          <p>
            In order to provide you with a great experience on this site we
            provide the functionality to set your preferences for how this site
            runs when you use it. In order to remember your preferences we need
            to set cookies so that this information can be called whenever you
            interact with a page is affected by your preferences.
          </p>
        </li>
      </ul>
      <p>
        <strong>Third Party Cookies</strong>
      </p>
      <p>
        In some special cases we also use cookies provided by trusted third
        parties. The following section details which third party cookies you
        might encounter through this site.
      </p>
      <ul>
        <li>
          <p>
            This site uses Google Analytics which is one of the most widespread
            and trusted analytics solution on the web for helping us to
            understand how you use the site and ways that we can improve your
            experience. These cookies may track things such as how long you
            spend on the site and the pages that you visit so we can continue to
            produce engaging content.
          </p>
          <p>
            For more information on Google Analytics cookies, see the official
            Google Analytics page.
          </p>
        </li>
        <li>
          <p>
            Third party analytics are used to track and measure usage of this
            site so that we can continue to produce engaging content. These
            cookies may track things such as how long you spend on the site or
            pages you visit which helps us to understand how we can improve the
            site for you.
          </p>
        </li>
        <li>
          <p>
            From time to time we test new features and make subtle changes to
            the way that the site is delivered. When we are still testing new
            features these cookies may be used to ensure that you receive a
            consistent experience whilst on the site whilst ensuring we
            understand which optimisations our users appreciate the most.
          </p>
        </li>
        <li>
          <p>
            As we sell products it&apos;s important for us to understand
            statistics about how many of the visitors to our site actually make
            a purchase and as such this is the kind of data that these cookies
            will track. This is important to you as it means that we can
            accurately make business predictions that allow us to monitor our
            advertising and product costs to ensure the best possible price.
          </p>
        </li>
        <li>
          <p>
            We use adverts to offset the costs of running this site and provide
            funding for further development. The behavioural advertising cookies
            used by this site are designed to ensure that we provide you with
            the most relevant adverts where possible by anonymously tracking
            your interests and presenting similar things that may be of
            interest.
          </p>
        </li>
      </ul>
      <p>
        <strong>More Information</strong>
      </p>
      <p>
        Hopefully that has clarified things for you and as was previously
        mentioned if there is something that you aren&apos;t sure whether you
        need or not it&apos;s usually safer to leave cookies enabled in case it
        does interact with one of the features you use on our site.
      </p>
      <p>
        For more general information on cookies, please read{' '}
        <Link
          color="inherit"
          href="https://www.generateprivacypolicy.com/#cookies"
        >
          &quot;Cookies&quot; article from the Privacy Policy Generator
        </Link>
        .
      </p>
      <p>
        However if you are still looking for more information then you can
        contact us through one of our preferred contact methods:
      </p>
      <ul>
        <li>Email: {WebionRepository.EMAIL}</li>
      </ul>
    </Paragraph>
  );
}
