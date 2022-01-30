import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { getImages } from 'services/publicationsApi';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import './App.css';

const items_on_the_page = 12;

export class App extends Component {
  state = {
    isLoading: false,
    images: [],
    query: '',
    page: 1,
    currentHitsPerPage: null,
    error: null,
  };

  handleFormSubmit = query => {
    this.setState(() => {
      return { query: query, page: 1, images: [] };
    });
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    if (prevQuery !== nextQuery) {
      this.getImagesData();
    }

    if (this.state.page > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  async getImagesData() {
    const { query, page } = this.state;
    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await getImages(query, page);
      if (totalHits === 0) {
        alert('Nothing found');
        this.setState({ isLoading: false, currentHitsPerPage: null });
        return;
      }
      const images = this.makeImagesArray(hits);

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          currentHitsPerPage: hits.length,
          page: prevState.page + 1,
        };
      });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  makeImagesArray = data => {
    return data.map(({ id, largeImageURL, tags, webformatURL }) => {
      return { id, largeImageURL, tags, webformatURL };
    });
  };

  handleLoadMoreClick = () => {
    this.getImagesData();
  };

  modalOpen = (moduleUrl, moduleAlt, event) => {
    event.preventDefault();
    this.setState({
      largeImageURL: moduleUrl,
      alt: moduleAlt,
    });
  };
  componentDidMount() {
    window.addEventListener('keydown', this.cleanEventListener);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.cleanEventListener);
  }

  modalClose = () => {
    this.setState({ largeImageURL: '', alt: '' });
  };

  cleanEventListener = e => {
    if (e.code === 'Escape') {
      this.modalClose();
    }
  };

  render() {
    const { images, currentHitsPerPage, error, isLoading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {images.length > 0 && !error && (
          <>
            <ImageGallery images={images} modalOpen={this.modalOpen} />
            {currentHitsPerPage && currentHitsPerPage < items_on_the_page && (
              <p className="Message">End of search results</p>
            )}
          </>
        )}
        {currentHitsPerPage === items_on_the_page && !isLoading && (
          <Button onClick={this.handleLoadMoreClick} />
        )}
        {isLoading && <Loader />}
        {error && <h2 className="Message">Please try again</h2>}
        {this.state.largeImageURL && (
          <Modal
            largeImageURL={this.state.largeImageURL}
            alt={this.state.alt}
            onClick={this.modalClose}
          />
        )}
      </div>
    );
  }
}
