import styles from './header.module.css'
import { Link } from 'react-router-dom'
import  React from 'react';
import 'reactjs-popup/dist/index.css';

export default function Header(props) {
    return (
        <div className = {styles.wrapper}>
            <div className = {styles.buttons}>
                <Link to = '/admin/'>Blogs</Link>
                <Link to = '/admin/reports'>Reports</Link>
                <Link to = '/admin/brokers'>Brokers</Link>
                <Link to = '/admin/prices'>Subscribe prices</Link>
            </div>
            <div className = {styles.buttons}>
                <Link to = '/admin/users'>All users</Link>
                <Link to = '/admin/users/paid'>Paid users</Link>
                <Link to = '/admin/schedules'>Schedules</Link>
            </div>
            <div className = {styles.buttons}>
                <Link to = '/admin/create/blog'>Create blog</Link>
                <Link to = '/admin/create/broker'>Create broker</Link>
                <Link to = '/admin/create/report'>Create report</Link>
            </div>
        </div>
    )
}
