import React from 'react';

export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link</h2>
            <p>Your link: <a href={link.to} target='_black' rel='noopener noreferrer'>{link.to}</a></p>
            <p>From: <a href={link.from} target='_black' rel='noopener noreferrer'>{link.from}</a></p>
            <p>Clicks: <b>{link.clicks}</b></p>
            <p>Date created: <b>{new Date(link.date).toLocaleDateString()}</b></p>
        </>
    );
}