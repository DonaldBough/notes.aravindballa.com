import React from 'react';
import { Link } from 'gatsby';
import { useStackedPagesProvider, LinkToStacked } from 'react-stacked-pages-hook';
import favicon from '../../images/favicon.ico'
import { Helmet } from 'react-helmet';

import BrainNote from './BrainNote';

import '../../style.css';

const NOTE_WIDTH = 576; // w-xl

// A wrapper component to render the content of a page when stacked
const StackedPageWrapper = ({
  PageIndexProvider,
  children,
  slug,
  title,
  overlay,
  obstructed,
  i,
}) => (
  <PageIndexProvider value={i}>
    <div
      className={`note-container md:max-w-xl px-4 overflow-y-auto bg-white md:sticky flex flex-col flex-shrink-0 ${
        overlay ? 'shadow-lg' : ''
      }`}
      style={{ left: 40 * i, right: -585, width: NOTE_WIDTH }}
    >
      <div
        className={`md:block hidden transition-opacity duration-100 ${
          obstructed ? `opacity-100` : `opacity-0`
        }`}
      >
        <div className={`transform rotate-90 origin-left pb-4 absolute z-10`}>
          <LinkToStacked to={slug} className="no-underline text-gray-900">
            <p className="m-0 font-bold">{title || slug}</p>
          </LinkToStacked>
        </div>
      </div>
      <div
        className={`flex flex-col min-h-full transition-opacity duration-100 ${
          obstructed ? `opacity-0` : `opacity-100`
        }`}
      >
        {children}
      </div>
    </div>
  </PageIndexProvider>
);

const BrainNotesContainer = ({ slug, note, location, siteMetadata }) => {
  // process data from gatsby pageQuery API
  const processPageQuery = React.useCallback((x) => x.json.data.brainNote, []);
  const [
    stackedPages,
    stackedPageStates,
    navigateToStackedPage,
    ContextProvider,
    PageIndexProvider,
    scrollContainer,
  ] = useStackedPagesProvider({
    firstPageSlug: slug,
    location,
    processPageQuery,
    pageWidth: NOTE_WIDTH,
  });

  return (
    <div>
      <div>
        <Helmet>
          <meta property="og:site_name" content="Donald's Notes - It's In Progress" data-react-helmet="true"/>
          <meta property="og:title" content="Donald's Notes - It's In Progress" data-react-helmet="true"/>
          <meta property="og:description" content="I hope sharing these notes publicly will spark fun and interesting conversations in my existing friend group and anyone else out there." data-react-helmet="true"/>
          <meta name="image" property="og:image" content="https://www.donaldbough.com/donald-typing-on-macbook.png" data-react-helmet="true"/>
          <meta property="og:url" content="https://www.donaldbough.com" data-react-helmet="true"/>
          <meta name="twitter:title" content="Donald's Notes - It's In Progress" data-react-helmet="true"/>
          <meta name="twitter:description" content="I hope sharing these notes publicly will spark fun and interesting conversations in my existing friend group and anyone else out there." data-react-helmet="true"/>
          <meta name="twitter:image" content="https://www.donaldbough.com/donald-typing-on-macbook.png" data-react-helmet="true"/>
          <meta name="twitter:card" content="summary_large_image" data-react-helmet="true"/>
          <title>
            {note.title} - {siteMetadata.title}
          </title>
          <link rel="icon" href={favicon} />
        </Helmet>
      </div>
      <div className="text-gray-900 flex flex-col min-h-screen h-screen">
        <header>
          <div className="py-2 border-b px-4 ">
            <Link to="/" className="no-underline font-semibold text-gray-900">
              {siteMetadata.title}
            </Link>
            <Link to="/" className="no-underline text-gray-800 pl-16">
              About these Notes
            </Link>
          </div>
        </header>

        <div
          className="flex-1 flex flex-grow overflow-x-hidden md:overflow-x-auto overflow-y-hidden"
          ref={scrollContainer}
        >
          <div
            className="note-columns-container flex flex-grow transition-width duration-100"
            style={{ width: NOTE_WIDTH * (stackedPages.length + 1) }}
          >
            <ContextProvider value={{ stackedPages, navigateToStackedPage }}>
              {/* Render the first page */}
              <StackedPageWrapper
                PageIndexProvider={PageIndexProvider}
                i={0}
                slug={slug}
                title={note.title}
                overlay={stackedPageStates[slug] && stackedPageStates[slug].overlay}
                obstructed={stackedPageStates[slug] && stackedPageStates[slug].obstructed}
              >
                <BrainNote note={note} />
              </StackedPageWrapper>

              {/* Render the stacked pages */}
              {stackedPages.map((page, i) => (
                <StackedPageWrapper
                  PageIndexProvider={PageIndexProvider}
                  i={i + 1}
                  key={page.slug}
                  slug={page.slug}
                  title={page.data.title}
                  overlay={stackedPageStates[page.slug] && stackedPageStates[page.slug].overlay}
                  obstructed={stackedPageStates[page.slug] && stackedPageStates[page.slug].obstructed}
                >
                  <BrainNote note={page.data} />
                </StackedPageWrapper>
              ))}
            </ContextProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrainNotesContainer;
