"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { message } from "antd";

const Logout = () => {
    const route = useRouter()
    localStorage.removeItem("access_token")
    message.error('Silahkan Login')
    route.push('/login')
    return (
        <div>Memuat. . .</div>
    )
}

export default Logout