import React from 'react'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const FrontPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className='flex items-center justify-center h-screen bg-cover bg-center relative'
      style={{
        backgroundImage: `url('https://marketplace.canva.com/EAE9i0KZqn4/1/0/1131w/canva-black-modern-gym-fitness-%28poster%29-0lClEU7P8H4.jpg')`,
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black opacity-10"></div>

      <div className='flex flex-col gap-4 text-white z-10 text-center'>
        {/* <h2 className='text-4xl font-bold mt-40'>Welcome To GymPlanr</h2> */}
        <FaRegArrowAltCircleRight
          size={50}
          className='mx-auto cursor-pointer mt-35 hover:text-gray-300 transition duration-200'
          onClick={() => navigate('/dashboard')}
        />
      </div>
    </div>
  );
};

export default FrontPage;
