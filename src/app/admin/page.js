import React from "react";
import MonthlySalesChart from "./compoments/ecommerce/MonthlySalesChart";
import MonthlyTarget from "./compoments/ecommerce/MonthlyTarget";
import StatisticsChart from "./compoments/ecommerce/StatisticsChart";
import RecentOrders from "./compoments/ecommerce/RecentOrders";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function Admin() {
  console.log("secret : ", process.env.JWT_SECRET)
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value;
  if(!token){
    redirect("/pages/login")
  }
  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET)
    console.log("user funded :", user)
  } catch (error) {
    redirect("/pages/login")
    console.log("error in token verification", error.message)
  }
  if(!user?.isAdmin){
    redirect("/")
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        {/* <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div> */}

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}

export default Admin;
