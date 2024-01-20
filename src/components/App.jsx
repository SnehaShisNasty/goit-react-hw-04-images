import { useState, useEffect } from 'react';

import { Main } from './App.styled';

import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import { ImageItem } from './imageGallery/imageItem/ImageItem';
import { Button } from './button/Button';
import { Loading } from './loading/Loading';

import { searchImgs } from './api/server';
import { Modal } from './modal/Modal';

const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [totalImg, setTotalImg] = useState(1);
  const [modal, setModal] = useState({
    isModal: false,
    modalImg: '',
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await searchImgs(search, page);
        console.log(data);
        setList(prevList =>
          data.hits?.length ? [...prevList, ...data.hits] : prevList
        );
        setTotalImg(data.total);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (search) {
      fetchPosts();
    }
  }, [search, page]);

  const handleSearch = ({ search }) => {
    if (search !== '') {
      setSearch(search);
      setList([]);
      setPage(1);
    }
  };
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  const showModal = link => {
    setModal({
      isModal: true,
      modalImg: link,
    });
  };
  const closeModal = () => {
    setModal({
      isModal: false,
    });
  };
  const isImg = Boolean(list.length) && 12 * page < totalImg;

  return (
    <Main>
      <Searchbar onSubmit={handleSearch}></Searchbar>

      <ImageGallery>
        <ImageItem data={list} showModal={showModal}></ImageItem>
      </ImageGallery>
      {loading && <Loading></Loading>}
      {isImg && <Button onClick={loadMore}></Button>}
      {modal.isModal && <Modal modal={modal} close={closeModal}></Modal>}
    </Main>
  );
};

export { App };
