import React, { useEffect } from 'react'
import videoBanner from '../assets/store.mp4'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import './Home.css'

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  // Inject Dialogflow script and bot HTML on mount
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"
    script.async = true
    document.body.appendChild(script)

    const dfMessenger = document.createElement("df-messenger")
    dfMessenger.setAttribute("intent", "WELCOME")
    dfMessenger.setAttribute("chat-title", "TextileBot")
    dfMessenger.setAttribute("agent-id", "626ded5d-d73b-4934-b40b-574cbf171c9d")
    dfMessenger.setAttribute("language-code", "en")
    dfMessenger.setAttribute("chat-icon", "https://cdn-icons-png.flaticon.com/512/4712/4712035.png") // 🤖 robot icon
    document.body.appendChild(dfMessenger)

    // Optional: Add styles
    const style = document.createElement("style")
    style.innerHTML = `
      df-messenger {
        --df-messenger-button-titlebar-color: #00796b;
        --df-messenger-chat-background-color: #ffffff;
        --df-messenger-font-color: #000000;
        --df-messenger-bot-message: #e0f7fa;
        --df-messenger-user-message: #b2dfdb;
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
      }
    `
    document.head.appendChild(style)
  }, [])

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => sub.category.some(c => c._id === id))
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory?.name)}-${subcategory?._id}`
    navigate(url)
  }

  return (
    
    <section className="bg-white">
      
      
      {/* Logo in the top-left corner */}
<div className="absolute top-4 left-4 z-50">
  <img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8zMzPMzMwsLCwpKSl9fX04ODgcHBzk5OS9vb0hISH19fU1NTVhYWFqamolJSWjo6Oqqqp2dnafn59KSkplZWXT09MAAABxcXHDw8OXl5dZWVkVFRXe3t7IyMhQUFCPj49BQUGCgoKKioru7u63t7cRERE/6hO8AAACKklEQVR4nO3ca1PiMBSAYUsqgTRLuSOLghf0///EhV1dBEvCDI3ntL7PV9KZ804KpQxwcwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwPfr3yY07kvn7QytyZOxQ+m8nWGZpVNqKByVnkIKKRT2gwqNdRGHV13nwotN5vUVmrtlP2KUvwd2I0uXY6NwD/Pf0aU9+1EYWznJFRaWk+jSnvX+wsJS4VmaTX8FzYqjPZyvZoG1U69wD3fPxJDcHBd27kOrdb6WRviTQpcFjvt4qOGFF6DwW1BIof7CycLZsz69Fz1bGDjcLuJvI9J76Kw7AUsTLjSr0PHrB+m8uCKPFA6kJ7wWhRTqRyGF+lFIoX4UUqgfhRTqRyGF+lFIoX4UUqgfhRTqRyGF+lFIoX4UUqgfhc0v3JahQp+ZmfSEVxsYHyj0diQ94NV6eegsNRvp+WowsYFC14CvdcVtzP4r+pWF5aP0cLWYv53bQ/NUSA9Xj+eyutDbtfRoNSm61YX5WHqy2vRdZaFryTm6NzBfCm3mmn8pPNg686XQrKSnqtXQdk8L23EpPNhkJ4WLR+mRajZ3J4VGeqLavWyPCpca/g+iXsXxHm6l50ni8l/JNtVPKPStL3zfw0x6kmSm/34E1ZK7wirz+7+FT9JzJPSc7+8KO9JjJFTs7jHKW+kpknp1mWnnxf6/2dur9AiJ9dp1V1ilRZ9cAAAAAAAAAAAAAAAAAAAAAAAAAAAAKPUHmkw4LEE8gjsAAAAASUVORK5CYII="
    alt="Thoovam Enterprises Logo"
    className="w-14 h-12.5 rounded-full shadow-md"
  />
</div>

      {/* Hero Section */}
<div className="relative w-full h-[60vh] lg:h-[80vh] overflow-hidden">
  <video
    src={videoBanner}
    className="absolute top-0 left-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  />

  {/* Centered Overlay with Company Name and Sale Text */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-white text-4xl sm:text-6xl font-extrabold drop-shadow-md mb-4">
      Thoovam Enterprises
    </h1>
    <h2 className="text-white text-4xl sm:text-4xl font-extrabold drop-shadow-md mb-4">
    Dress to Impress
    </h2>
    <p className="text-yellow-300 text-4xl sm:text-6xl font-extrabold mt-4 drop-shadow-lg">
  10<span className="mx-2">–</span>20<span className="align-super text-2xl sm:text-4xl">%</span> <span>OFF</span>
</p>

  </div>
</div>


      {/* Category Grid */}
      <div className="container mx-auto px-4 my-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {loadingCategory
          ? new Array(10).fill(null).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4 min-h-36 grid gap-2 shadow animate-pulse">
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-6 rounded"></div>
              </div>
            ))
          : categoryData.map(cat => (
              <div
                key={cat._id}
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
                className="cursor-pointer bg-white border rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <img
                  src={cat.image}
                  className="w-full h-36 object-contain p-3"
                  alt={cat.name}
                />
                <div className="text-center font-medium text-sm py-2">{cat.name}</div>
              </div>
            ))}
      </div>

      {/* Products by Category */}
      {categoryData?.map(c => (
        <CategoryWiseProductDisplay key={c?._id} id={c?._id} name={c?.name} />
      ))}
    </section>
  )
}

export default Home
