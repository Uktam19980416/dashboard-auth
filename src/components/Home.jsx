import { useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ phone_number: phoneNumber, password: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && data) {
          localStorage.setItem('token', data?.data?.tokens?.accessToken?.token)
          toast.success('Login successful')
          navigate('/dashboard')
        console.log(data)
        }
      }).catch(() => {
        toast.error('Invalid phone number or password')
        navigate('/')
      })
  }
  return (
    <div className="container w-full max-w-[1440px] mx-auto h-screen">
      <form
        className="flex flex-col items-center justify-center h-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl font-bold mb-8">To Your Account</h1>
        <input
          type="text"
          placeholder="Phone Number"
          className="border border-gray-400 mb-4 p-2 rounded"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-400 mb-4 p-2 rounded"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  )
}
