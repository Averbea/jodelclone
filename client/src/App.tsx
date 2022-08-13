import React from 'react';
import './App.css';
import Feed from './components/Feed/Feed';
import Footer from './components/Footer/Footer';
import SortingHeader from './components/SortingHeader/SortingHeader';

export enum View { Home, Channels, Inbox, Me}
function App() {

 

  const [currentView, setCurrentView] = React.useState(View.Home)

  let page;

  switch(currentView){
    case View.Home: 
      page = 
        <>
          <SortingHeader/ >
          <Feed />
        </>
      break;
    default: 
      page = "not implemented yet" 

  }
  return (
    <div className='App'>
      {page}
      <Footer activePage={currentView} changeView={(newView: View) => setCurrentView(newView)}/>
    </div>
  );
}

export default App;
