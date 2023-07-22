'use client'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Avatar from '@mui/material/Avatar';

import styles from './message.module.css'
import { useEffect, useState } from 'react';
import Image from 'next/image';

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
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#7feebe',
            color: '#7feebe',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
            },
            '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(1.2)',
                background: '#1bb673',
                opacity: 1,
            },
            },
        }));
    return (
        <>
        <div className={styles.message_container}>
            <div className={styles.avatar}>
                {avatars.map(avatar => (
                    // eslint-disable-next-line react/jsx-key
                    <div>
                        <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            variant="dot"
                        ></StyledBadge>
                        <Avatar alt={avatar.name} src={avatar.img} />
                        <h3>{avatar.name}</h3>
                        
                    </div>
                ))}
            </div>
            {messages.length == 0 ? (
                <div className={styles.welcome}>
                    <Image src="/welcome.png" alt='welcome' width="1080" height="720"/>
                </div>
            ) : 
            (
                <div className={styles.messasge_field }>
                {messages.map((message) => (
                    <div key={message.msg}>
                        <h1>{message.msg}</h1> 
                        <p>{message.createdAt}</p>
                    </div>
                ))}
            </div>
            )}
        </div>
        <div className={styles.input_box}>
            <Box width="100%">
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="input-with-icon-adornment">
                </InputLabel>
                <Input 
                onKeyDown={getMessage}
                placeholder='Digite algo ...'
                sx={{
                    bgcolor: '#7feebe',
                    border : 1,
                    borderRadius: 2
                }}
                id="input-with-icon-adornment"
                endAdornment={
                    <InputAdornment position="start">
                        <AddPhotoAlternateIcon />
                    </InputAdornment>
                }
                />
            </FormControl>
            </Box>
        </div>
        </>
    )
}