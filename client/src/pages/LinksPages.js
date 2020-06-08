import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';

export const LinksPage = () => {
    const [links, setLinks] = useState([]);
    const { request, loading } = useHttp();
    const { token } = useContext(AuthContext);
    console.log(token);
    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                authorization: `Bearer ${token}`
            });
            setLinks(fetched);
        } catch(e) {}
    }, [request, token]);

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks]);
    if (loading) return <Loader/>;
    console.log(links)
    return (
        <>
            { !loading && <LinksList links={links}/> }
        </>
    );
};
