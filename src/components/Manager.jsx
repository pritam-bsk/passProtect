import { useRef, useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const Manager = () => {
  const passEyeRef = useRef()
  const passRef = useRef()
  const [passwordArray, setpasswordArray] = useState([]);
  const [form, Setform] = useState({
    id: "",
    site: "",
    user: "",
    password: ""
  })

  const getPasswords = async () => {
    const req = await fetch("http://localhost:3000/")
    let passwords = await req.json();
    if (passwords) {
      setpasswordArray(passwords);
    }
  }

  useEffect(() => {
    getPasswords();
  }, [])

  const copyText = async (text) => {
    console.log("copy btn")
    console.log(text)
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    await navigator.clipboard.writeText(text)
  }

  const showPassword = () => {
    if (passEyeRef.current.src.includes("icons/eye.png")) {
      passEyeRef.current.src = "icons/eyecross.png";
      passRef.current.type = "text";
    } else {
      passRef.current.type = "password";
      passEyeRef.current.src = "icons/eye.png";
    }
  }

  const handelSave = async (e) => {
    if (form.site.length > 3 && form.user.length > 3 && form.password.length > 3) {
      setpasswordArray(prev => [...prev, { ...form, id: uuidv4() }]);
      const req = await fetch("http://localhost:3000/", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, id: uuidv4() }) })
      Setform({ id: "", site: "", user: "", password: "" })
      toast('Password saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: { color: 'green' }
      });
    }
    else {
      toast('Invalid Entry!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: { color: 'red' }
      });
    }
  }

  const handelEdit = async (id) => {
    console.log("hello")
    Setform(passwordArray.filter(item => item.id === id)[0]);
    const req = await fetch("http://localhost:3000/", { method: "DELETE", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handelDelete = async (id) => {
    console.log("delete")
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      console.log(form)
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      const req = await fetch("http://localhost:3000/", { method: "DELETE", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
      toast('Deleted successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: { color: 'red' }
      });
    }
  }

  return (
    <>
      <ToastContainer />
      <div className='mainBody flex flex-col justify-center items-center'>
        <div className='company my-10 text-white min-w-screen flex flex-col justify-center items-center'>
          <div className="logo font-bold text-white text-3xl">
            <span className='text-green-500'> &lt;</span>
            <span>Pass</span><span className='text-green-500'>Protect/&gt;</span>
          </div>
          <div className='texts'>Your own Password Manager</div>
        </div>
        <div className="inputs flex flex-col gap-10 justify-center items-center">
          <div className="url">
            <input value={form.site} onChange={(e) => { Setform({ ...form, site: e.target.value }) }} type="text" className='min-w-[70vw] p-1 px-3 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50' placeholder='Enter URL of the site' />
          </div>
          <div className="relative datas flex gap-7 sm: flex-col md:flex-row">
            <input value={form.user} onChange={(e) => { Setform({ ...form, user: e.target.value }) }} type="text" className='min-w-[70vw] md:min-w-[50vw] p-1 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50' placeholder='Enter your User Name' />
            <input value={form.password} onChange={(e) => { Setform({ ...form, password: e.target.value }) }} ref={passRef} type="password" className='min-w-[70vw] md:min-w-[18vw] p-1 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50' placeholder='Enter Password' />
            <span className='absolute right-[5px] top-1 cursor-pointer' onClick={showPassword}>
              <img ref={passEyeRef} className='p-1' width={26} src="icons/eye.png" alt="eye" />
            </span>
          </div>
          <button onClick={(e) => { handelSave(e) }} className=' font-semibold text-md flex justify-center items-center 
                          gap-1 bg-green-400 hover:bg-green-300 rounded-full px-6 
                          py-2 w-fit border border-green-900  transform transition 
                          duration-150 ease-out active:scale-95 active:shadow-inner 
                          focus:outline-none select-none cursor-pointer'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover" >
            </lord-icon>Save</button>
        </div>
        <div className="passContainer flex flex-col gap-1 m-5 min-w-[70vw]">
          <div className="heading text-2xl font-semibold text-white">Your Passwords</div>
          {passwordArray.length <= 0 ?
            <div className='text-white my-2'>You have no passwords saved</div> :
            <div className="table">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-100'>
                {passwordArray.map((item, idx) => {
                  return <tr key={idx}>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center '>
                        <a target='_blank'>{item.site}</a>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center '>
                        <span>{item.user}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.user)}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center '>
                        <span> {
                          "*".repeat(item.password.length)
                        } </span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='justify-center py-2 border border-white text-center'>
                      <span className='cursor-pointer mx-1' onClick={() => { handelEdit(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                      <span className='cursor-pointer mx-1' onClick={() => { handelDelete(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                }
                )}
              </tbody>
            </div>
          }
        </div>
      </div>
    </>
  )
}

export default Manager
