'use client'
import Avatar from '@mui/material/Avatar';

import styles from './message.module.css'
import { useEffect, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi'
import { BiChevronDown } from 'react-icons/bi'

export default function Message() {
    const[messages, setMessages] = useState([])

    function getMessage(e) {
        
        if(e.code.toLowerCase() === 'enter') {
            if(e.target.value == 0) return
            let messageInput = e.target.value
            setMessages([...messages, { msg: messageInput}])
            e.target.value = ''
            fetch('http://localhost:3000/messages', { 
                method: 'POST', 
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    createdAt: Date.now(),
                    msg: messageInput
                })
            })
            .then(res => res.json())
        }
    }
    useEffect(() => {
        fetch('http://localhost:3000/messages')
        .then(res => res.json())
        .then(res => {
            setMessages(res)
        })
    }, [])

    let avatars = [
        {
            name: 'alex',
            img: '/static/images/avatar/2.jpg'
        },
        {
            name: 'danilo',
            img: '/static/images/avatar/3.jpg'
        },
        {
            name: 'davi calvo',
            img: '/static/images/avatar/4.jpg'
        },

    ]
    return (
        <>
        <div className={styles.message_container}>
            <div className={styles.avatar}>
                <h2 className={styles.username}> uDaanilo <BiChevronDown /></h2>
                {avatars.map(avatar => (
                    // eslint-disable-next-line react/jsx-key
                    <div className={styles.avatar_container}>
                        <Avatar alt={avatar.name} src={avatar.img} />
                        <div className={styles.user_infos}>
                            <h4>{avatar.name}</h4>
                            <p>active 1m ago</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.messasge_field }>
            {messages.map((message) => (
                <div key={message.msg}>
                    <h1>{message.msg}</h1> 
                    <p>{message.createdAt}</p>
                </div>
            ))}
            </div>
        </div>
        <div className={styles.input_box}>
            <input  placeholder='Message...' onKeyDown={getMessage}/>
            <BiImageAdd />
        </div>
        </>
    )
}