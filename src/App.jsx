import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Manager from './components/Manager'

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px]">
        <Manager />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default App
