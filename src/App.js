import { useRef, useState } from 'react';
// import 'react-phone-number-input/style.css';
import { QueryClientProvider, QueryClient } from 'react-query';
// import PhoneInput from 'react-phone-number-input';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './pages/Footer';
import Header from './pages/Header';
import './App.css';
import useDebounce from './Hooks/useDebounce';
import { uuidv4 } from './util';
import { formatTime } from './util/formatTime';

import Button from './components/Button/Button';
import {
  useInput,
  useOnline,
  useCounter,
  useFocus,
  useOutsideClick,
  useDidMount,
} from './Hooks';
import NormalComp from './Hoc/NormalComp';
import Fetch from './Advance/Fetch';
import Memo from './Advance/Memo';
import { useCountDown } from './Hooks/new/useCountDown';
import Pagenation from './components/Pagenation/Pagenation';
import PagenationQ from './components/Pagenation/PagenationQ';

function Playground() {
  // console.log(uuidv4());
  // console.log(formatTime.fToNow(Date.now()));
  const myInput = useInput('', {
    validate: (newValue) => newValue.length < 15,
  });
  const { value, increment, decrement, incrementBy, decrementBy } =
    useCounter(0);
  const [count, setCount] = useState(0);
  const isOnline = useOnline();
  const handleClick = () => {
    increment();
    // incrementBy(10);
    // decrementBy(6);
    // decrement();
  };
  const [isFocus, setIsFocus] = useState(false);
  const fun = (e) => console.log(e);

  const { focusProps } = useFocus({
    onFocus: () => {
      console.log('focus');
    },
    onBlur: () => {
      console.log('blur');
    },
    onFocusChange: (isFocused) => {
      setIsFocus(isFocused);
      fun();
    },
  });
  ///
  const { countDown, start } = useCountDown(0, 60);
  const ref = useRef();
  function myComponent() {
    alert('Clicked outside');
  }
  useOutsideClick(ref, myComponent);

  return (
    <div className=''>
      <div style={{ backgroundColor: 'lightblue' }}>
        <h3 style={{ color: isOnline ? 'green' : 'red' }}>
          Status: You are {isOnline ? 'Online' : 'Offline'}
        </h3>
      </div>
      <div className='use-mouse'>
        <>
          <p> Move mouse here to see changes to position </p>
          <p>X position is {'null'}</p>
          <p>X position is {'null'}</p>
        </>
      </div>
      <div>
        <input {...myInput} />
        <p>
          Value is <b>{myInput.value}</b>
        </p>
      </div>
      <div>
        <p>
          Value is <b>{value}</b>
        </p>
        <button
          className='lint-button'
          onClick={handleClick}
        >
          Increment
        </button>
      </div>
      <label style={{ display: 'block' }}>
        Name:
        <input
          {...focusProps}
          style={{
            border: isFocus ? '3px solid orange' : '1px solid gray',
          }}
        />
      </label>
      <div
        className='App'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Rooks : useOutsideClick Example</h1>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'lightblue',
          }}
          ref={ref}
        >
          <h2 className='inside'>This is inside</h2>
          <Memo />

          <NormalComp />
          <Fetch />
        </div>
      </div>
    </div>
  );
}
const App = () => {
  const [show, setShow] = useState(false);
  const client = new QueryClient();
  return (
    // <QueryClientProvider
    //   client={client}
    //   contextSharing
    // >
    //   <Sidebar onShow={() => setShow(!show)} />
    //   {/* <Pagenation /> */}
    //   <PagenationQ />
    //   {/* <Header />
    //   <Footer /> */}
    // </QueryClientProvider>
    <>
      <Header />
      <Footer />
    </>
  );
};
export default App;
