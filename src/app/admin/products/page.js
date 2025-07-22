import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { faceProduct } from '../../lib/products'
import { MdDeleteForever } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineFilter } from "react-icons/ai";
import { Dialog } from "@headlessui/react";
import AddProductModal from '@/app/components/AddProductModal';


async function Products() {
  const products = await faceProduct(); /// face data from api
  return (
    <>
          {/* face data from api */}
            <h1 className="text-3xl font-bold text-center mt-10">Products</h1>
          <div className="flex justify-between align-center content-center ">
            
            <button className=" justify-center transform motion-reduce:transform-fill hover:-translate-y-1 hover:scale-108 transition ease-in-out duration-300 w-50 shadow-lg hover:shadow-cyan-500/50 shadow-cyan-500/20   inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            <svg
              className="stroke-current fill-white dark:fill-gray-800"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.29004 5.90393H17.7067"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M17.7075 14.0961H2.29085"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z"
                strokeWidth="1.5"
              />
              <path
                d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z"
                strokeWidth="1.5"
              />
            </svg>
            Filter
          </button>
          </div>
    
          <div className="mx-10 my-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 items-center justify-center md:grid-cols-2 sm:grid-cols-1 gap-4">
           <AddProductModal />
            {products.map((product) => (
              <Link key={product._id} href={`/pages/product/${product._id}`}>
                <div
                  key={product._id}
                  className="card transform motion-reduce:transform-fill hover:-translate-y-1 hover:scale-108 transition ease-in-out duration-300 bg-base-100 w-50 shadow-lg hover:shadow-cyan-500/50 shadow-cyan-500/20 mt-10"
                >
                  <MdEditNote className="absolute max-w-10 motion-reduce:transform-fill hover:translate-y-2 hover:scale-200 transition ease-in-out duration-300 top-2 right-10 text-blue-500 hover:shadow-blue-500/50 cursor-pointer" />
                  <MdDeleteForever className="absolute max-w-10 motion-reduce:transform-fill hover:translate-y-2 hover:scale-200 transition ease-in-out duration-300 top-2 right-2 text-red-500 hover:shadow-red-500/50 cursor-pointer" />
                  <figure>
                    <Image
                      
                      className="max-h-50 rounded-xl"
                      src={product.images[0]}
                      alt={product.name}
                      unoptimized
                      width={300}
                      height={40}
                    />
                  </figure>
                  <div className="card-body">
                    <h2 key={product._id} className="card-title">{product.name}</h2>
                    <p>
                      Link card component has Link figure, Link body part, and
                      inside body there are title and actions parts
                    </p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-primary">Buy Now</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
    
          {/* end face data from api */}
        </>
  )
}

export default Products