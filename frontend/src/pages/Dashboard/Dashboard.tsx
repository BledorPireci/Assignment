import React from 'react';
import MainSideBar from "../../components/sideBar";
import {Outlet} from "@mui/icons-material";
import "./Dashboard.scss"

export default function MainPage() {
    return (
        <section className="main-page">
            <MainSideBar />
            <h1>Welcome to our page!</h1>

            <section className="main-content">
                <Outlet />
            </section>
        </section>
    );
}

