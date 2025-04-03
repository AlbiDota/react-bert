import { useState, useRef, useEffect } from "react";
import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import "./Catalog.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { firestore, auth, collection, addDoc, serverTimestamp, query, orderBy, limit } from "../../firebase";
import { DocumentSnapshot } from "firebase/firestore";

export default function Catalog() {
	
	//XXXXXXXXDDDDDDDDDDDDDDDDXDXD XD XD XDX DXDXDXD
	//TYPESCRIPT ????? SKJØnner ikke as wtf så tungvindt
   //vi bruker typeconverter på collection vår så typescript ska slutte å grine

    const catalogRef = collection(firestore, "catalog");
    const gameQuery = query(catalogRef, orderBy('added'));

    const [games] = useCollectionData(gameQuery);

    return ( //kjører ut alle de forskjellige spella fra tablet i databasen. formatert i CatalogElement(props).
        <div className="catalog-wrapper">
            {games?.slice().map((ele) => 
                (<CatalogElement key={ele.game} game={ele} />))}
        </div>
    );

    function CatalogElement(props) {
        const { game, descr, image, added, linksTo } = props.game;

        // const nav = useNavigate();
        // const handleClick = () => { nav(`/${linksTo}`);};

        return ( <>
            <NavLink to={`${linksTo}`} className="catalog-element" >
                <p id="catalog-title">{game}</p> 
                <img src={`/Assets/CatalogAssets/${image}`} alt={game}/>
                <p id="catalog-desc">{descr}</p>
            </NavLink>

        </>);
    };
};