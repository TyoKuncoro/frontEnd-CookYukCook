"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";

const Logout = () => {
    const route = useRouter()
    localStorage.removeItem("access_token")
    route.push('/login')
    setTimeout(message.error('Silahkan Login'), 2000);
    return (
        <div className="text-3xl font-extrabold">Memuat. . .</div>
    )
}

export default Logout