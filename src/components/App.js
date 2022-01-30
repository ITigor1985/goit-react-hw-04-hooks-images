import { useEffect, useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { getImages } from 'services/publicationsApi';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import './App.css';

const items_on_the_page = 12;

export function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentHitsPerPage, setCurrentHitsPerPage] = useState(null);
  const [error, setError] = useState(null);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    async function getImagesData() {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await getImages(query, page);

        if (totalHits === 0) {
          alert('Nothing found');
          setIsLoading(false);
          setCurrentHitsPerPage(null);
          return;
        }

        const images = hits.map(({ id, largeImageURL, tags, webformatURL }) => {
          return { id, largeImageURL, tags, webformatURL };
        });

        setImages(prevState => {
          return [...prevState, ...images];
        });
        if (page > 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
        setCurrentHitsPerPage(hits.length);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (!query) {
      return;
    }
    getImagesData();
  }, [query, page]);

  useEffect(() => {
    window.addEventListener('keydown', cleanEventListener);
  });

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  const modalOpen = (moduleUrl, moduleAlt, event) => {
    event.preventDefault();
    setLargeImageURL(moduleUrl);
    setAlt(moduleAlt);
  };

  const modalClose = () => {
    setLargeImageURL('');
    setAlt('');
  };

  const cleanEventListener = e => {
    if (e.code === 'Escape') {
      modalClose();
    }
  };
  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />

      {images.length > 0 && !error && (
        <>
          <ImageGallery images={images} modalOpen={modalOpen} />
          {currentHitsPerPage && currentHitsPerPage < items_on_the_page && (
            <p className="Message">End of search results</p>
          )}
        </>
      )}
      {currentHitsPerPage === items_on_the_page && !isLoading && (
        <Button onClick={handleLoadMoreClick} />
      )}
      {isLoading && <Loader />}
      {error && <h2 className="Message">Please try again</h2>}
      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} alt={alt} onClick={modalClose} />
      )}
    </div>
  );
}
