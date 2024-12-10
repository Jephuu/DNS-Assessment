import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
// import Menu from './Menu'
import MenuContainer from './MenuContainer';
import TestConnection from './TestConnection';

function App() {

  return (
    <>
      <MenuContainer/>
      <TestConnection/>
    </>
  )
}

export default App