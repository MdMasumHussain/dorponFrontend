import Image from "next/image";
import Link from "next/link";
import { faceProduct } from "./lib/products";
import Carousel from "./components/Carousel";
import AddToCartButton from "./components/AddToCartButton";
export const revalidate = 10;
// export async function generateStaticParams() {
//   const products = await faceProduct();
//   return{
//     props : {products},
//     revalidate : 10,
//   }
// }

export default async function Home() {
  const products = await faceProduct(); /// face data from api
  
  
  return (
    <>
      <div className="mt-25">
        <Carousel />
      </div>
      {/* face data from api */}

      {/* <div className="mx-10 my-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 items-center justify-center md:grid-cols-2 sm:grid-cols-1 gap-4">
        {products.map((product) => (
          <Link key={product._id} href={`/pages/product/${product._id}`}>
            <div
              key={product._id}
              className="card transform motion-reduce:transform-fill hover:-translate-y-1 hover:scale-108 transition ease-in-out duration-300 bg-base-100 w-70 shadow-lg hover:shadow-cyan-500/50 shadow-cyan-500/20 mt-10"
            >
              <figure>
                <Image
                  className="max-h-50"
                  src={product.images[0]}
                  alt={product.name}
                  unoptimized
                  width={300}
                  height={40}
                />
              </figure>
              <div className="card-body">
                <h2 key={product._id} className="card-title">
                  {product.name}
                </h2>
                <p>
                  Link card component has Link figure, Link body part, and
                  inside body there are title and actions parts
                </p>
                <div className="card-actions justify-end">
                  
                  <span className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <AddToCartButton product={product} />

                </div>
              </div>
            </div>
          </Link>
        ))}
      </div> */}

      <div className="mx-10 my-10 grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
        {products.map((product) => (
          <Link key={product._id} href={`/pages/product/${product._id}`}>
            <div className="card bg-base-100 w-72 h-[400px] shadow-lg hover:shadow-cyan-500/50 shadow-cyan-500/20 mt-10 flex flex-col transition ease-in-out duration-300 transform hover:-translate-y-1 hover:scale-105">
              {/* Image fixed height */}
              <figure className="h-[200px] w-full flex items-center justify-center overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  unoptimized
                  width={300}
                  height={200}
                  className="object-contain h-full"
                />
              </figure>

              {/* Content */}
              <div className="card-body flex flex-col justify-between">
                <h2 className="card-title">{product.name}</h2>
                <p className="line-clamp-2 text-sm">
                  Some short description here...
                </p>
                <div className="card-actions justify-between items-center">
                  <span className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <AddToCartButton product={product} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* end face data from api */}
    </>
  );
}
