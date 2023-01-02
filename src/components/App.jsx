import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { animateScroll as scroll } from 'react-scroll';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [newFetch, setNewFetch] = useState(false);

  const formSubmitHandler = data => {
    if (searchQuery !== data) {
      setSearchQuery(data);
      setPage(1);
      setNewFetch(true);
    }
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
    setNewFetch(false);
    scroll.scrollToBottom();
  };

  return (
    <div>
      <Searchbar onSubmit={formSubmitHandler} />
      <div>
        <ImageGallery
          searchQuery={searchQuery}
          page={page}
          newFetch={newFetch}
          onClick={loadMore}
        />
      </div>
    </div>
  );
}

// class App extends Component {
//   state = {
//     searchQuery: '',
//     page: 1,
//     newFetch: false,
//   };

//   formSubmitHandler = data => {
//     if (this.state.searchQuery !== data) {
//       this.setState({ searchQuery: data, page: 1, newFetch: true });
//     }
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1, newFetch: false }));
//     scroll.scrollToBottom();
//   };

//   render() {
//     return (
//       <div>
//         <Searchbar onSubmit={this.formSubmitHandler} />
//         <div>
//           <ImageGallery
//             searchQuery={this.state.searchQuery}
//             page={this.state.page}
//             newFetch={this.state.newFetch}
//             onClick={this.loadMore}
//           />
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
