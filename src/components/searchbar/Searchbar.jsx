import { useState, useEffect, useRef } from 'react';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [state, setState] = useState({
    search: '',
  });
  const [preState, setPreState] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (preState !== state.search) {
      onSubmit({ ...state });
    }
    setPreState(state.search);
    reset();
  };

  const reset = () => {
    setState({
      search: '',
    });
  };
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ButtonLabel>Search</ButtonLabel>
        </Button>

        <Input
          type="text"
          placeholder="Search images and photos"
          name="search"
          onChange={handleChange}
          value={state.search}
          ref={inputRef}
        />
      </Form>
    </Header>
  );
};

export { Searchbar };
